import { PaginationDto } from '../dto/common';

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

export interface Pagination extends PaginationDto {
  pages: number;
  total: number;
}
