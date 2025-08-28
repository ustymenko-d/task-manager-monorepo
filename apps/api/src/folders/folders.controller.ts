import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Logger,
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
import {
  FolderResponse,
  GetFoldersResponse,
  JwtUser,
} from '@repo/shared/types/index';
import { FolderIdDto, FolderNameDto, PaginationDto } from '@repo/api/dto/index';

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

  @Patch()
  @UseGuards(AuthGuard('jwt'), FolderOwner)
  async rename(
    @Body() { id, name }: FolderNameDto & FolderIdDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<FolderResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Folder renamed successfully.',
        folder: await this.foldersService.renameFolder(id, name, socketId),
      }),
      'Eror while renaminging folder.',
      this.logger,
    );
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), FolderOwner)
  async delete(
    @Body() { id }: FolderIdDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<FolderResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Folder deleted successfully.',
        folder: await this.foldersService.deleteFolder(id, socketId),
      }),
      'Eror while deleting folder.',
      this.logger,
    );
  }
}
