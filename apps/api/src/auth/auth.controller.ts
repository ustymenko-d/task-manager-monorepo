import {
	Controller,
	Post,
	Body,
	Delete,
	UseGuards,
	Req,
	Res,
	Query,
	Get,
	Logger,
	UseInterceptors,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CookiesService } from './cookies/cookies.service';
import { handleRequest } from 'src/common/utils/requestHandler';
import { StripRecaptchaInterceptor } from 'src/common/strip-recaptcha.interceptor';
import { RecaptchaGuard } from 'src/common/recaptcha.guard';
import {
	AuthResponse,
	JwtUser,
	ResponseStatus,
	UserInfo,
} from '@repo/shared/types';
import { CredentialsDto } from '@repo/api/dto';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);

	constructor(
		private readonly authService: AuthService,
		private readonly cookiesService: CookiesService
	) {}

	@Post('signup')
	@UseGuards(RecaptchaGuard)
	@UseInterceptors(StripRecaptchaInterceptor)
	async signup(
		@Body() body: CredentialsDto,
		@Res({ passthrough: true }) res: Response
	): Promise<AuthResponse> {
		return handleRequest(
			async () => {
				const { email, password, rememberMe } = body;
				const { accessToken, refreshToken, userInfo } =
					await this.authService.signup(email, password);

				this.cookiesService.setAuthCookies(
					res,
					accessToken,
					refreshToken,
					rememberMe
				);

				return {
					success: true,
					message: 'Registration successful. Please verify your email.',
					userInfo,
				};
			},
			'Failed to register user.',
			this.logger
		);
	}

	@Get('resend-verification-email')
	@UseGuards(AuthGuard('jwt'))
	async resendVerificationEmail(
		@Req() req: { user: JwtUser }
	): Promise<ResponseStatus> {
		return handleRequest(
			async () => {
				await this.authService.resendVerificationEmail(req.user.email);
				return {
					success: true,
					message: 'Verification email sent successfully.',
				};
			},
			'Failed to resend verification email.',
			this.logger
		);
	}

	@Get('email-verification')
	async emailVerification(
		@Query('verificationToken') verificationToken: string
	): Promise<ResponseStatus> {
		return handleRequest(
			async () => {
				await this.authService.verifyEmail(verificationToken);
				return { success: true, message: 'Email verified successfully.' };
			},
			'Failed to verify email.',
			this.logger
		);
	}

	@Post('login')
	@UseGuards(RecaptchaGuard)
	@UseInterceptors(StripRecaptchaInterceptor)
	async login(
		@Body() body: CredentialsDto,
		@Res({ passthrough: true }) res: Response
	): Promise<AuthResponse> {
		return handleRequest(
			async () => {
				const { email, password, rememberMe } = body;
				const { accessToken, refreshToken, userInfo } =
					await this.authService.login(email, password);

				this.cookiesService.setAuthCookies(
					res,
					accessToken,
					refreshToken,
					rememberMe
				);

				return { success: true, message: 'Login successful.', userInfo };
			},
			'Failed to login user.',
			this.logger
		);
	}

	@Get('account-info')
	@UseGuards(AuthGuard('jwt'))
	async getAccountInfo(@Req() req: { user: JwtUser }): Promise<UserInfo> {
		return handleRequest(
			async () => await this.authService.getAccountInfo(req.user.userId),
			'Failed to get account info.',
			this.logger
		);
	}

	@Get('logout')
	@UseGuards(AuthGuard('jwt'))
	async logout(
		@Req() req: Request & { user: JwtUser },
		@Res({ passthrough: true }) res: Response
	): Promise<ResponseStatus> {
		return handleRequest(
			async () => {
				const { userId, sessionId } = req.user;
				await this.authService.logout(userId, sessionId);
				this.cookiesService.clearAuthCookies(res);
				return { success: true, message: 'Logout successful.' };
			},
			'Failed to logout user.',
			this.logger
		);
	}

	@Delete('delete-account')
	@UseGuards(RecaptchaGuard, AuthGuard('jwt'))
	@UseInterceptors(StripRecaptchaInterceptor)
	async deleteAccount(
		@Req() req: { user: JwtUser },
		@Res({ passthrough: true }) res: Response
	): Promise<ResponseStatus> {
		return handleRequest(
			async () => {
				await this.authService.deleteUser(req.user.userId);
				this.cookiesService.clearAuthCookies(res);
				return {
					success: true,
					message: `User deleted successfully.`,
				};
			},
			'Failed to delete account.',
			this.logger
		);
	}
}
