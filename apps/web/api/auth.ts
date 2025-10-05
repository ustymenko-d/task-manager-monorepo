import {
	AuthResponse,
	GoogleAuthPayload,
	ResponseStatus,
	UserInfo,
} from '@repo/shared/types';
import { RecaptchaToken } from '@/types/common';
import { Credentials, Email, Password } from '@/types/auth';
import { apiRoutesInstance, handleApiRouteRequest } from '@/lib/axios';

const AUTH_API_URL = '/auth';

const authAPI = {
	googleAuth: (payload: GoogleAuthPayload) =>
		handleApiRouteRequest<AuthResponse>(() =>
			apiRoutesInstance.post(`${AUTH_API_URL}/google/verification`, payload)
		),

	signup: (payload: Credentials) =>
		handleApiRouteRequest<AuthResponse>(() =>
			apiRoutesInstance.post(`${AUTH_API_URL}/signup`, payload)
		),

	verifyEmail: (verificationToken: string) =>
		handleApiRouteRequest<ResponseStatus>(
			() =>
				apiRoutesInstance.get(
					`${AUTH_API_URL}/email-verification?verificationToken=${verificationToken}`
				)
			// false
		),

	resendVerificationEmail: () =>
		handleApiRouteRequest<ResponseStatus>(() =>
			apiRoutesInstance.get(`${AUTH_API_URL}/resend-verification-email`)
		),

	login: (payload: Credentials) =>
		handleApiRouteRequest<AuthResponse>(() =>
			apiRoutesInstance.post(`${AUTH_API_URL}/login`, payload)
		),

	getAccountInfo: () =>
		handleApiRouteRequest<UserInfo>(() =>
			apiRoutesInstance.get(`${AUTH_API_URL}/account-info`)
		),

	logout: () =>
		handleApiRouteRequest<ResponseStatus>(() =>
			apiRoutesInstance.get(`${AUTH_API_URL}/logout`)
		),

	refreshToken: () =>
		handleApiRouteRequest<ResponseStatus>(
			() => apiRoutesInstance.get(`${AUTH_API_URL}/tokens/refresh-tokens`)
			// false
		),

	deleteAccount: (payload: RecaptchaToken) =>
		handleApiRouteRequest<ResponseStatus>(() =>
			apiRoutesInstance.delete(`${AUTH_API_URL}/delete-account`, {
				data: payload,
			})
		),

	forgotPassword: (payload: Email & RecaptchaToken) =>
		handleApiRouteRequest<ResponseStatus>(() =>
			apiRoutesInstance.post(
				`${AUTH_API_URL}/password/forgot-password`,
				payload
			)
		),

	resetPassword: (
		payload: Password & RecaptchaToken,
		resetToken: string | null
	) =>
		handleApiRouteRequest<ResponseStatus>(
			() =>
				apiRoutesInstance.patch(
					`${AUTH_API_URL}/password/reset-password?resetToken=${resetToken}`,
					payload
				)
			// false
		),

	clearAuthCookies: () =>
		handleApiRouteRequest<ResponseStatus>(() =>
			apiRoutesInstance.get(`${AUTH_API_URL}/cookies/clear-auth-cookies`)
		),
};

export default authAPI;
