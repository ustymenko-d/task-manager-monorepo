import { AuthResponse, ResponseStatus, UserInfo } from '@repo/api/types';
import { ApiAxios, handleApiRequest } from './Axios';
import { RecaptchaToken } from '@/types/common';
import { Credentials, Email, Password } from '@/types/auth';

const AUTH_API_URL = '/auth';

const AuthAPI = {
  signup: (payload: Credentials) =>
    handleApiRequest<AuthResponse>(() =>
      ApiAxios.post(`${AUTH_API_URL}/signup`, payload),
    ),

  verifyEmail: (verificationToken: string) =>
    handleApiRequest<ResponseStatus>(
      () =>
        ApiAxios.get(
          `${AUTH_API_URL}/email-verification?verificationToken=${verificationToken}`,
        ),
      false,
    ),

  resendVerificationEmail: () =>
    handleApiRequest<ResponseStatus>(() =>
      ApiAxios.get(`${AUTH_API_URL}/resend-verification-email`),
    ),

  login: (payload: Credentials) =>
    handleApiRequest<AuthResponse>(() =>
      ApiAxios.post(`${AUTH_API_URL}/login`, payload),
    ),

  getAccountInfo: () =>
    handleApiRequest<UserInfo>(() =>
      ApiAxios.get(`${AUTH_API_URL}/account-info`),
    ),

  logout: () =>
    handleApiRequest<ResponseStatus>(() =>
      ApiAxios.get(`${AUTH_API_URL}/logout`),
    ),

  refreshToken: () =>
    handleApiRequest<ResponseStatus>(
      () => ApiAxios.get(`${AUTH_API_URL}/tokens/refresh-tokens`),
      false,
    ),

  deleteAccount: (payload: RecaptchaToken) =>
    handleApiRequest<ResponseStatus>(() =>
      ApiAxios.delete(`${AUTH_API_URL}/delete-account`, { data: payload }),
    ),

  forgotPassword: (payload: Email & RecaptchaToken) =>
    handleApiRequest<ResponseStatus>(() =>
      ApiAxios.post(`${AUTH_API_URL}/password/forgot-password`, payload),
    ),

  resetPassword: (
    payload: Password & RecaptchaToken,
    resetToken: string | null,
  ) =>
    handleApiRequest<ResponseStatus>(
      () =>
        ApiAxios.patch(
          `${AUTH_API_URL}/password/reset-password?resetToken=${resetToken}`,
          payload,
        ),
      false,
    ),

  clearAuthCookies: () =>
    handleApiRequest<ResponseStatus>(() =>
      ApiAxios.get(`${AUTH_API_URL}/cookies/clear-auth-cookies`),
    ),
};

export default AuthAPI;
