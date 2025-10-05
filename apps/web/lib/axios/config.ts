export const baseConfig = {
	baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
	withCredentials: true,
	timeout: 60000 * 2,
};
