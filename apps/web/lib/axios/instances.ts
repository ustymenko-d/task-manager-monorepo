import axios, { AxiosInstance } from 'axios';
import { baseConfig } from './config';

export const baseInstance: AxiosInstance = axios.create(baseConfig);

export const apiRoutesInstance: AxiosInstance = axios.create({
	...baseConfig,
	baseURL:
		typeof window !== 'undefined' && process.env.APP_ENV === 'development'
			? new URL('/api', window.location.origin).toString()
			: new URL(
					'/api',
					process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'http://localhost:3001'
				).toString(),
});
