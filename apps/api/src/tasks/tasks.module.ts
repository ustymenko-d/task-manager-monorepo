import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtStrategy } from 'src/common/jwt.strategy';
import { SocketsModule } from 'src/sockets/sockets.module';

@Module({
  imports: [PrismaModule, SocketsModule],
  controllers: [TasksController],
  providers: [TasksService, JwtStrategy],
})
export class TasksModule {}
