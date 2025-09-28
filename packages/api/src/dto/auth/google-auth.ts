import { IsBoolean, IsString } from 'class-validator';

export class GoogleAuthDto {
	@IsString()
	code: string;

	@IsBoolean()
	rememberMe: boolean;
}
