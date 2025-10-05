import { baseInstance, apiRoutesInstance } from './instances';
import { attachSocketInterceptor } from './interceptors/socket';
import { handleRequest, handleApiRouteRequest } from './requestHandlers';

const interceptors = [attachSocketInterceptor];

interceptors.forEach((fn) => fn(apiRoutesInstance));

export {
	baseInstance,
	apiRoutesInstance,
	handleRequest,
	handleApiRouteRequest,
};
