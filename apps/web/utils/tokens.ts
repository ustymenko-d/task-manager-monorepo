import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';

export const getTokens = (cookies: NextRequest['cookies']) => ({
	accessToken: cookies.get('accessToken')?.value,
	refreshToken: cookies.get('refreshToken')?.value,
	rememberMe: cookies.get('refreshed')?.value === 'true',
});

export const verifyToken = (accessToken?: string): boolean => {
	if (!accessToken) return false;

	try {
		const { exp }: { exp: number } = jwtDecode(accessToken);
		const currentTime = Math.floor(Date.now() / 1000);
		return exp > currentTime;
	} catch {
		return false;
	}
};
