import { ResponseStatus } from './common';

export interface TokenPair {
	accessToken: string;
	refreshToken: string;
}

export interface AuthCookies extends Partial<TokenPair> {
	rememberMe?: string;
}

export interface UserInfo {
	id: string;
	email: string;
	username: string;
	createdAt: Date;
	isVerified: boolean;
}

export interface User extends UserInfo {
	password: string;
	tokenVersion: number;
	verificationToken: string | null;
}

export type AuthData = TokenPair & { userInfo: UserInfo };

export type AuthResponse = ResponseStatus & { userInfo: UserInfo };

export type UserByQuery =
	| { id: string; tokenVersion?: number }
	| { email: string }
	| { verificationToken: string };

export type GoogleAuthCode = { code: string };
