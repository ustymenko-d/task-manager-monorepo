import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	Method,
} from 'axios';
import { baseConfig } from './config';
import { toast } from 'sonner';
import { clearAuthCookies } from '@/utils/cookies';
import { NextResponse } from 'next/server';
import { baseInstance } from './instances';
import createSingletonPromise from '@/utils/createSingletonPromise';
import authAPI from '@/api/auth';

export const handleApiRouteRequest = async <T>(
	apiRequest: () => Promise<AxiosResponse<T>>,
	allowRetry = true
): Promise<T> => {
	try {
		const res = await apiRequest();
		const { data } = res;

		if (isNeedTokensRefreshData(data)) {
			if (!allowRetry) throw new Error('Tokens need to be refresh');

			await handleTokenRefresh();
			return handleApiRouteRequest(apiRequest, false);
		}

		return data;
	} catch (error) {
		const isAxios = axios.isAxiosError(error);
		let message: string;

		if (isAxios && error.code === 'ECONNABORTED') {
			message = `The request exceeded the limit of ${
				baseConfig.timeout / 1000
			} seconds. Please try again.`;
		} else {
			message = isAxios
				? error.response?.data?.message || error.message
				: error instanceof Error
					? error.message
					: 'Unexpected error';
		}

		toast.error(message);

		if (
			isAxios &&
			error.response?.status === 401 &&
			error.response?.data?.message === 'User not found'
		) {
			await clearAuthCookies(true);
		}

		throw error;
	}
};

export const handleRequest = async <T = undefined>(
	url: string,
	method: Method,
	payload?: T,
	extraConfig: AxiosRequestConfig = {}
): Promise<NextResponse> => {
	try {
		const axiosInstance = await getAxiosInstance();

		const res = await axiosInstance.request({
			url,
			method,
			...(payload && { data: payload }),
			...extraConfig,
		});

		const { data, status, headers } = res;

		return withSetCookie(
			NextResponse.json(data, { status }),
			headers['set-cookie']
		);
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const { status, data, headers } = error.response;

			if (status === 401 && data?.message === 'Token expired') {
				return NextResponse.json({ needRefresh: true });
			}

			return withSetCookie(
				NextResponse.json(data || { message: 'Unexpected error' }, { status }),
				headers?.['set-cookie']
			);
		}

		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
};

const getServerAxios = async () => {
	const { cookies } = await import('next/headers');
	const serverAxios = axios.create(baseConfig);

	serverAxios.interceptors.request.use(async (config) => {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore.toString();

		if (cookieHeader) {
			config.headers.set('Cookie', cookieHeader);
		}

		return config;
	});

	return serverAxios;
};

const getAxiosInstance = async (): Promise<AxiosInstance> =>
	typeof window === 'undefined' ? await getServerAxios() : baseInstance;

const withSetCookie = (
	res: NextResponse,
	cookies?: string | string[]
): NextResponse => {
	if (!cookies) return res;

	(Array.isArray(cookies) ? cookies : [cookies]).forEach((cookie) =>
		res.headers.append('set-cookie', cookie)
	);

	return res;
};

const isNeedTokensRefreshData = (
	data: unknown
): data is { needRefresh: true } =>
	typeof data === 'object' &&
	data !== null &&
	'needRefresh' in data &&
	data.needRefresh === true;

const handleTokenRefresh = async () => {
	try {
		await refreshToken();
	} catch {
		await clearAuthCookies(true);
		throw new Error('Tokens refresh failed');
	}
};

const refreshToken = createSingletonPromise(() => authAPI.refreshToken());
