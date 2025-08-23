import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { PasswordDto } from './password.dto';

export class CredentialsDto extends PasswordDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  rememberMe: boolean;

  @IsOptional()
  @IsString()
  recaptchaToken?: string;
}
