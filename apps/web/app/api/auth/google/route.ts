import { NextResponse } from 'next/server';

export async function GET() {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
	const options = new URLSearchParams({
		client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
		redirect_uri: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/google`,
		response_type: 'code',
		scope: 'openid email profile',
		access_type: 'offline',
		// prompt: 'select_account',
	});

	return NextResponse.redirect(`${rootUrl}?${options.toString()}`);
}
