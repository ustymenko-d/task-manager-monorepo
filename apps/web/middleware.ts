import { NextRequest, NextResponse } from 'next/server';

import isStartPage from './utils/isStartPage';
import { getTokens, verifyToken } from './utils/tokens';
import { PUBLIC_PATHS_REQUIRING_PARAMS } from './const';

export const config = {
	matcher: [
		'/',
		'/auth/:path*',
		'/verification',
		'/home',
		'/table',
		'/folders',
		'/settings',
	],
};

const redirectTo = (url: string, request: NextRequest) =>
	NextResponse.redirect(new URL(url, request.url));

export const middleware = async (request: NextRequest) => {
	const { pathname, searchParams } = request.nextUrl;
	const { accessToken, refreshToken } = getTokens(request.cookies);
	const isAccessValid = verifyToken(accessToken);

	const isAuthorized = isAccessValid || (accessToken && refreshToken);

	const requiredParams = PUBLIC_PATHS_REQUIRING_PARAMS[pathname];
	if (requiredParams) {
		return searchParams.has(requiredParams)
			? NextResponse.next()
			: redirectTo('/', request);
	}

	if (isStartPage(pathname)) {
		if (isAuthorized) {
			return redirectTo('/home', request);
		}
		return NextResponse.next();
	}

	if (!isAuthorized) {
		return redirectTo('/', request);
	}

	return NextResponse.next();
};
