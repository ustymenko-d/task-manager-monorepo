import { ConfigService } from '@nestjs/config';

const mockConfigValues: Record<string, string> = {
  JWT_SECRET: 'jwt-secret',
  JWT_RESET_SECRET: 'jwt-reset-secret',
  FRONTEND_URL: 'https://web.test',
  EMAIL_USER: 'noreply@test.com',
  EMAIL_PASS: 'Password123',
  RECAPTCHA_SECRET_KEY: 'recaptcha-secret-key',
};

export const configServiceMock: Partial<ConfigService> = {
  get: jest.fn((key: string) => mockConfigValues[key] ?? null),
};

export const mockLoggerError = (target: unknown): jest.SpyInstance =>
  jest.spyOn(target['logger'], 'error').mockImplementation(() => {});
