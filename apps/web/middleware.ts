import { NextRequest, NextResponse } from 'next/server';

import { PUBLIC_PATHS_REQUIRING_TOKENS } from './const';
import isStartPage from './utils/isStartPage';
import { getTokens, verifyToken } from './utils/tokens';

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

  const tokenParam = PUBLIC_PATHS_REQUIRING_TOKENS[pathname];
  if (tokenParam) {
    return searchParams.has(tokenParam)
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
