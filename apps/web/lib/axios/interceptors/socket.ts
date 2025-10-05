import { AxiosInstance } from 'axios';

export function attachSocketInterceptor(instance: AxiosInstance) {
	if (typeof window !== 'undefined') {
		import('@/lib/socket').then(({ getSocketId }) => {
			instance.interceptors.request.use((config) => {
				const socketId = getSocketId();
				if (socketId) {
					config.headers['x-socket-id'] = socketId;
				}
				return config;
			});
		});
	}
}
