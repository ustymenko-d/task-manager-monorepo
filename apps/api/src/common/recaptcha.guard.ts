import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

@Injectable()
export class RecaptchaGuard implements CanActivate {
  private readonly logger = new Logger(RecaptchaGuard.name);
  private readonly recaptchaSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.recaptchaSecret = this.configService.get<string>(
      'RECAPTCHA_SECRET_KEY',
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.body.recaptchaToken;

    this.logger.debug(`Incoming request to ${req.method} ${req.url}`);
    this.logger.debug(
      `recaptchaToken in body: ${token ? 'present' : 'missing'}`,
    );

    if (!token) {
      this.logger.warn('No reCAPTCHA token provided');
      throw new ForbiddenException('No reCAPTCHA token');
    }

    const googleRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${this.recaptchaSecret}&response=${token}&remoteip=${req.ip}`,
      },
    );

    const data = (await googleRes.json()) as RecaptchaResponse;
    const { success, score } = data;

    this.logger.debug(
      `Google reCAPTCHA response: success=${success}, score=${score}`,
    );

    if (!success || (score !== undefined && score < 0.5))
      throw new ForbiddenException('reCAPTCHA validation failed');

    return true;
  }
}
