import { Test, TestingModule } from '@nestjs/testing';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { mockPasswordService, PasswordServiceMock } from 'test/mocks/password';
import { configServiceMock, mockLoggerError } from 'test/mocks/common';
import { EmailDto, PasswordDto } from '@repo/api/dto';
import { ConfigService } from '@nestjs/config';

describe('PasswordController', () => {
  let controller: PasswordController;
  let service: PasswordServiceMock;
  let loggerErrorSpy: jest.SpyInstance;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordController],
      providers: [
        { provide: PasswordService, useFactory: mockPasswordService },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    controller = module.get(PasswordController);
    service = module.get(PasswordService);
    loggerErrorSpy = mockLoggerError(controller);
  });

  describe('forgotPassword', () => {
    const dto: EmailDto = { email: 'user@email.com' };

    it('should send reset email', async () => {
      (service.sendResetPasswordEmail as jest.Mock).mockResolvedValue(
        undefined,
      );

      const result = await controller.forgotPassword(dto);

      expect(service.sendResetPasswordEmail).toHaveBeenCalledWith(dto.email);
      expect(result).toEqual({
        success: true,
        message: 'Reset password email sent successfully.',
      });
      expect(loggerErrorSpy).not.toHaveBeenCalled();
    });

    it('should log error and rethrow when service fails', async () => {
      const err = new Error('SMTP fail');
      (service.sendResetPasswordEmail as jest.Mock).mockRejectedValue(err);

      await expect(controller.forgotPassword(dto)).rejects.toThrow(err);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Error while sending reset password email.',
        expect.anything(),
      );
    });
  });

  describe('resetPassword', () => {
    const dto: PasswordDto = { password: 'newPass123' };
    const token = 'reset-token';

    it('should update password', async () => {
      (service.resetPassword as jest.Mock).mockResolvedValue(undefined);

      const result = await controller.resetPassword(token, dto);

      expect(service.resetPassword).toHaveBeenCalledWith(token, dto.password);
      expect(result).toEqual({
        success: true,
        message: 'Password updated successfully.',
      });
      expect(loggerErrorSpy).not.toHaveBeenCalled();
    });

    it('should log error and rethrow when service fails', async () => {
      const err = new Error('DB error');
      (service.resetPassword as jest.Mock).mockRejectedValue(err);

      await expect(controller.resetPassword(token, dto)).rejects.toThrow(err);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Reset password error.',
        expect.anything(),
      );
    });
  });
});
