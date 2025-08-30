import { JwtUser, User } from '@repo/shared/types';

export const jwtUserMock: JwtUser = {
  userId: 'user-id',
  email: 'user@email.com',
  sessionId: 'session-id',
  tokenVersion: 1,
};

export const userMock: User = {
  id: 'user-id',
  email: 'user@email.com',
  username: 'user',
  createdAt: new Date(),
  isVerified: true,
  password: 'hashed-pass',
  tokenVersion: 1,
  verificationToken: null,
};
