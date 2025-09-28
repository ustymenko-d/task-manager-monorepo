import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { CookiesModule } from 'src/auth/cookies/cookies.module';
import { TokensModule } from 'src/auth/tokens/tokens.module';

@Module({
	imports: [AuthModule, TokensModule, PrismaModule, CookiesModule],
	controllers: [GoogleController],
	providers: [GoogleService],
})
export class GoogleModule {}
