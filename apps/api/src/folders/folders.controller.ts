import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FolderOwner } from './folders.guard';
import { FoldersService } from './folders.service';
import { handleRequest } from 'src/common/utils/requestHandler';
import { RecaptchaGuard } from 'src/common/recaptcha.guard';
import { StripRecaptchaInterceptor } from 'src/common/strip-recaptcha.interceptor';
import { JwtUser } from '@repo/api/common/types';
import { FolderNameDto } from '@repo/api/folders/dto/folder-name.dto';
import { FolderIdDto } from '@repo/api/folders/dto/folder-id.dto';
import { FolderResponse, GetFoldersResponse } from '@repo/api/folders/types';
import { PaginationDto } from '@repo/api/common/dto';

@Controller('folders')
export class FoldersController {
  private readonly logger = new Logger(FoldersController.name);

  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  @UseGuards(RecaptchaGuard, AuthGuard('jwt'))
  @UseInterceptors(StripRecaptchaInterceptor)
  async create(
    @Req() req: { user: JwtUser },
    @Body() { name }: FolderNameDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<FolderResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Folder created successfully.',
        folder: await this.foldersService.createFolder(
          { name, userId: req.user.userId },
          socketId,
        ),
      }),
      'Eror while creating folder.',
      this.logger,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async get(
    @Req() req: { user: JwtUser },
    @Query() query: PaginationDto & FolderNameDto,
  ): Promise<GetFoldersResponse> {
    return handleRequest(
      async () => {
        const { page, limit, name } = query;
        return await this.foldersService.getFolders({
          name,
          page: +page,
          limit: +limit,
          userId: req.user.userId,
        });
      },
      'Eror while fetching folders',
      this.logger,
    );
  }

  @Patch(':folderId')
  @UseGuards(AuthGuard('jwt'), FolderOwner)
  async rename(
    @Param() { folderId }: FolderIdDto,
    @Body() { name }: FolderNameDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<FolderResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Folder renamed successfully.',
        folder: await this.foldersService.renameFolder(
          folderId,
          name,
          socketId,
        ),
      }),
      'Eror while renaminging folder.',
      this.logger,
    );
  }

  @Delete(':folderId')
  @UseGuards(AuthGuard('jwt'), FolderOwner)
  async delete(
    @Param() { folderId }: FolderIdDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<FolderResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Folder deleted successfully.',
        folder: await this.foldersService.deleteFolder(folderId, socketId),
      }),
      'Eror while deleting folder.',
      this.logger,
    );
  }
}
