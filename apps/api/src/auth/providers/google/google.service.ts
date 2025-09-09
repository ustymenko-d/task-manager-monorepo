import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthData } from '@repo/shared/types';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { AuthService } from 'src/auth/auth.service';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleService {
  private readonly logger = new Logger(GoogleService.name);
  private googleClient: OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly tokens: TokensService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async googleAuth(code: string): Promise<AuthData> {
    const idToken = await this.exchangeCodeForIdToken(code);
    const payload = await this.verifyIdToken(idToken);
    const user = await this.findOrCreateUser(payload);
    const sessionId = uuidv4();

    return {
      accessToken: this.tokens.createAccessToken(user, sessionId),
      refreshToken: await this.tokens.createRefreshToken(user.id, sessionId),
      userInfo: await this.auth.createUserInfo(user),
    };
  }

  private async exchangeCodeForIdToken(code: string): Promise<string> {
    const params = new URLSearchParams({
      code,
      client_id: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      client_secret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      redirect_uri: this.configService.get<string>('GOOGLE_REDIRECT_URI'),
      grant_type: 'authorization_code',
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch Google tokens: ${errorText}`);
    }

    const { id_token } = await response.json();
    if (!id_token) throw new Error('No ID token returned from Google');

    return id_token;
  }

  private async verifyIdToken(idToken: string): Promise<TokenPayload> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    });

    const payload = ticket.getPayload();

    if (!payload) throw new Error('Invalid Google token');

    return payload;
  }

  private async findOrCreateUser(payload: TokenPayload) {
    const { sub: providerId, email, name } = payload;

    const account = await this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerId: {
          provider: 'google',
          providerId,
        },
      },
      include: { user: true },
    });

    if (account) return account.user;

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          password: null,
          username: name ?? email.split('@')[0],
          isVerified: true,
          verificationToken: null,
        },
      });
    }

    await this.prisma.oAuthAccount.create({
      data: {
        provider: 'google',
        providerId,
        userId: user.id,
      },
    });

    return user;
  }
}
