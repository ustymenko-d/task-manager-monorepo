import authAPI from '@/api/auth';
import { clearAuthCookies } from '@/utils/cookies';
import createSingletonPromise from '@/utils/createSingletonPromise';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

const refreshToken = createSingletonPromise(() => authAPI.refreshToken());

export async function attachRefreshTokensInterceptor(instance: AxiosInstance) {
	instance.interceptors.response.use(
		(res) => res,
		async (error) => {
			const originalRequest = error.config as AxiosRequestConfig & {
				_retry?: boolean;
			};

			if (
				error.response &&
				error.response.status === 401 &&
				!originalRequest._retry &&
				!noNeedRefreshUrls.some((url) => originalRequest.url?.includes(url))
			) {
				originalRequest._retry = true;
				try {
					await refreshToken();
					return instance(originalRequest);
				} catch {
					await clearAuthCookies(true);
				}
			}

			return Promise.reject(error);
		}
	);
}

const noNeedRefreshUrls = [
	'/auth/email-verification',
	'/auth/tokens/refresh-tokens',
	'/auth/password/reset-password',
];
