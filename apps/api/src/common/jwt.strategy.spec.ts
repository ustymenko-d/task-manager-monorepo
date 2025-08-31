import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { configServiceMock } from 'test/mocks/common';
import { mockPrisma } from 'test/mocks/prisma';
import type { Request } from 'express';

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn(),
}));

const mockedJwtVerify = jwt.verify as jest.Mock;

const mockRequest: Request = {
  cookies: { accessToken: 'valid-token' },
} as any;

const payload = { sub: 'user-id', email: 'user@email.com', tokenVersion: 1 };

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    jwtStrategy = new JwtStrategy(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      mockPrisma as any,
      configServiceMock as ConfigService,
    );
    jest.clearAllMocks();
  });

  describe('jwtFromRequest', () => {
    it('extracts token from cookies', () => {
      const extractor = (req: any) => req?.cookies?.accessToken || null;

      expect(extractor(mockRequest)).toBe('valid-token');
      expect(extractor({})).toBeNull();
    });
  });

  describe('validate', () => {
    test.each([
      {
        name: 'expired token',
        error: new jwt.TokenExpiredError('Token expired', new Date()),
        message: 'Token expired',
      },
      {
        name: 'invalid token',
        error: new Error('Invalid token'),
        message: 'Invalid token',
      },
    ])('throws UnauthorizedException if $name', async ({ error, message }) => {
      mockedJwtVerify.mockImplementation(() => {
        throw error;
      });

      await expect(jwtStrategy.validate(mockRequest, payload)).rejects.toThrow(
        new UnauthorizedException(message),
      );
    });

    it('throws UnauthorizedException if user not found', async () => {
      mockedJwtVerify.mockReturnValue(payload);
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      const warnSpy = jest
        .spyOn(Logger.prototype, 'warn')
        .mockImplementation(() => {});

      await expect(jwtStrategy.validate(mockRequest, payload)).rejects.toThrow(
        new UnauthorizedException('User not found'),
      );
      expect(warnSpy).toHaveBeenCalledWith(
        `User not found (ID: ${payload.sub}).`,
      );
    });

    it('throws UnauthorizedException if tokenVersion mismatches', async () => {
      mockedJwtVerify.mockReturnValue(payload);
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: payload.sub,
        tokenVersion: payload.tokenVersion + 1,
        email: payload.email,
      });
      const warnSpy = jest
        .spyOn(Logger.prototype, 'warn')
        .mockImplementation(() => {});

      await expect(jwtStrategy.validate(mockRequest, payload)).rejects.toThrow(
        new UnauthorizedException('Invalid token version'),
      );
      expect(warnSpy).toHaveBeenCalledWith(
        `Token version mismatch (user ID: ${payload.sub}).`,
      );
    });

    it('returns user data if token and user are valid', async () => {
      mockedJwtVerify.mockReturnValue(payload);
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: payload.sub,
        tokenVersion: payload.tokenVersion,
        email: payload.email,
      });

      const result = await jwtStrategy.validate(mockRequest, payload);

      expect(result).toEqual({
        userId: payload.sub,
        email: payload.email,
        tokenVersion: payload.tokenVersion,
      });
    });
  });
});
