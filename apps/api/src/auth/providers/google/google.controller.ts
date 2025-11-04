import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { GoogleAuthDto } from '@repo/api/dto';
import { AuthResponse } from '@repo/shared/types';
import { CookiesService } from 'src/auth/cookies/cookies.service';
import { handleRequest } from 'src/common/utils/requestHandler';
import { GoogleService } from './google.service';
import type { Response } from 'express';

@Controller('auth/google')
export class GoogleController {
	private readonly logger = new Logger(GoogleController.name);

	constructor(
		private readonly googleService: GoogleService,
		private readonly cookiesService: CookiesService
	) {}

	@Post('verification')
	async googleAuth(
		@Body() body: GoogleAuthDto,
		@Res({ passthrough: true }) res: Response
	): Promise<AuthResponse> {
		this.logger.log('Google auth verification called', body);

		return handleRequest(
			async () => {
				const { accessToken, refreshToken, userInfo } =
					await this.googleService.googleAuth(body.code);

				this.cookiesService.setAuthCookies(
					res,
					accessToken,
					refreshToken,
					body.rememberMe
				);

				return {
					success: true,
					message: 'Google authorization successful.',
					userInfo,
				};
			},
			'Failed to verify Google Auth.',
			this.logger
		);
	}
}
