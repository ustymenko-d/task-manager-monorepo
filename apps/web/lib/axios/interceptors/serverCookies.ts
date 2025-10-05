import { AxiosInstance } from 'axios';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function attachServerCookiesInterceptor(
	instance: AxiosInstance,
	cookies: () => Promise<ReadonlyRequestCookies>
) {
	instance.interceptors.request.use(async (config) => {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore.toString();

		if (cookieHeader) {
			config.headers.set('Cookie', cookieHeader);
		}

		return config;
	});
}
