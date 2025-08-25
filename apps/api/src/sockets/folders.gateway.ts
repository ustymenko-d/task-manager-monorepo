import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { BaseGateway } from './base.gateway';
import { ConfigService } from '@nestjs/config';
import { Folder } from '@repo/shared/types/index';

@Injectable()
@WebSocketGateway()
export class FoldersGateway extends BaseGateway {
  constructor(configService: ConfigService) {
    super(configService);
  }

  emitFolderCreated(folder: Folder, initiatorSocketId?: string) {
    this.emitEntityEvent<Folder>(
      'folder',
      'created',
      folder,
      initiatorSocketId,
    );
  }

  emitFolderRenamed(folder: Folder, initiatorSocketId?: string) {
    this.emitEntityEvent<Folder>(
      'folder',
      'renamed',
      folder,
      initiatorSocketId,
    );
  }

  emitFolderDeleted(folder: Folder, initiatorSocketId?: string) {
    this.emitEntityEvent<Folder>(
      'folder',
      'deleted',
      folder,
      initiatorSocketId,
    );
  }
}
