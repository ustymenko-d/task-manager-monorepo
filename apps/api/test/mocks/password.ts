import { createMockMethods } from 'test/utils/createMockMethods';

export const mockPasswordService = () =>
	createMockMethods(['sendResetPasswordEmail', 'resetPassword'] as const);

export type PasswordServiceMock = ReturnType<typeof mockPasswordService>;
