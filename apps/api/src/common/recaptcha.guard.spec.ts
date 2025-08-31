import { configServiceMock } from 'test/mocks/common';
import { RecaptchaGuard } from './recaptcha.guard';
import { ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('RecaptchaGuard', () => {
  let guard: RecaptchaGuard;
  let context: Partial<ExecutionContext>;
  let request: any;
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    global.fetch = jest.fn();
    guard = new RecaptchaGuard(configServiceMock as ConfigService);
    request = { body: {}, method: 'POST', url: '/test', ip: '1.2.3.4' };
    context = {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => ({}),
        getNext: () => ({}),
      }),
    } as ExecutionContext;

    warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});
  });

  it('throws ForbiddenException when no token provided', async () => {
    await expect(
      guard.canActivate(context as ExecutionContext),
    ).rejects.toThrow(ForbiddenException);
    expect(warnSpy).toHaveBeenCalledWith('No reCAPTCHA token provided');
  });

  it('throws ForbiddenException when Google response success=false', async () => {
    request.body.recaptchaToken = 'token';
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false, score: 1 }),
    });

    await expect(
      guard.canActivate(context as ExecutionContext),
    ).rejects.toThrow('reCAPTCHA validation failed');
  });

  it('throws ForbiddenException when score < 0.5', async () => {
    request.body.recaptchaToken = 'token';
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, score: 0.3 }),
    });

    await expect(
      guard.canActivate(context as ExecutionContext),
    ).rejects.toThrow('reCAPTCHA validation failed');
  });

  it('returns true when success=true and score>=0.5', async () => {
    request.body.recaptchaToken = 'token';
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, score: 0.7 }),
    });

    await expect(guard.canActivate(context as ExecutionContext)).resolves.toBe(
      true,
    );
  });

  it('returns true when success=true and no score provided', async () => {
    request.body.recaptchaToken = 'token';
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
    });

    await expect(guard.canActivate(context as ExecutionContext)).resolves.toBe(
      true,
    );
  });
});
