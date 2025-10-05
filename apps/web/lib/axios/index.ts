import { baseInstance, apiRoutesInstance } from './instances';
import { attachRefreshTokensInterceptor } from './interceptors/refreshTokens';
import { attachSocketInterceptor } from './interceptors/socket';
import { handleRequest, handleApiRouteRequest } from './requestHandlers';

attachSocketInterceptor(apiRoutesInstance);
attachRefreshTokensInterceptor(baseInstance);
attachRefreshTokensInterceptor(apiRoutesInstance);

export {
	baseInstance,
	apiRoutesInstance,
	handleRequest,
	handleApiRouteRequest,
};
