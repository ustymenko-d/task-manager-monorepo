import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketsModule } from 'src/sockets/sockets.module';
import { FoldersModule } from 'src/folders/folders.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, SocketsModule, FoldersModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService, JwtStrategy],
})
export class TasksModule {}
