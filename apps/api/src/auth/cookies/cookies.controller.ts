import { Controller, Get, Logger, Res } from '@nestjs/common';
import { handleRequest } from 'src/common/utils/requestHandler';
import { CookiesService } from './cookies.service';
import type { Response } from 'express';
import { ResponseStatus } from '@repo/shared/types';

@Controller('auth/cookies')
export class CookiesController {
	private readonly logger = new Logger(CookiesController.name);

	constructor(private readonly cookiesService: CookiesService) {}

	@Get('clear-auth-cookies')
	async clearAuthCookies(
		@Res({ passthrough: true }) res: Response
	): Promise<ResponseStatus> {
		return handleRequest(
			async () => {
				this.cookiesService.clearAuthCookies(res);
				return { success: true, message: 'Cookies cleared successfully.' };
			},
			'Failed to clear cookies.',
			this.logger
		);
	}
}
