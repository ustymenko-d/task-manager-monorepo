import { Body, Controller, Logger, Patch, Post, Query } from '@nestjs/common';
import { handleRequest } from 'src/common/utils/requestHandler';
import { PasswordService } from './password.service';
import { EmailDto } from '@repo/api/auth/dto/email.dto';
import { PasswordDto } from '@repo/api/auth/dto/password.dto';
import { ResponseStatus } from '@repo/api/common/types';

@Controller('auth/password')
export class PasswordController {
  private readonly logger = new Logger(PasswordController.name);

  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot-password')
  // @UseGuards(RecaptchaGuard)
  // @UseInterceptors(StripRecaptchaInterceptor)
  async forgotPassword(@Body() { email }: EmailDto): Promise<ResponseStatus> {
    return handleRequest(
      async () => {
        await this.passwordService.sendResetPasswordEmail(email);
        return {
          success: true,
          message: 'Reset password email sent successfully.',
        };
      },
      'Error while sending reset password email.',
      this.logger,
    );
  }

  @Patch('reset-password')
  // @UseGuards(RecaptchaGuard)
  // @UseInterceptors(StripRecaptchaInterceptor)
  async resetPassword(
    @Query('resetToken') resetToken: string,
    @Body() { password }: PasswordDto,
  ): Promise<ResponseStatus> {
    return handleRequest(
      async () => {
        await this.passwordService.resetPassword(resetToken, password);
        return { success: true, message: 'Password updated successfully.' };
      },
      'Reset password error.',
      this.logger,
    );
  }
}
