export interface ResponseStatus {
  success: boolean;
  message: string;
}

export interface JwtUser {
  userId: string;
  email: string;
  tokenVersion: number;
  sessionId: string;
}
