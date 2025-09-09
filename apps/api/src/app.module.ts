import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GoogleModule } from './auth/providers/google/google.module';
import { TasksModule } from './tasks/tasks.module';
import { FoldersModule } from './folders/folders.module';
import { CleanupModule } from './cleanup/cleanup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    PrismaModule,
    AuthModule,
    GoogleModule,
    TasksModule,
    FoldersModule,
    CleanupModule,
  ],
})
export class AppModule {}
