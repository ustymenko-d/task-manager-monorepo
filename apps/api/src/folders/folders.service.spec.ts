import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FoldersService } from './folders.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoldersGateway } from 'src/sockets/folders.gateway';
import { buildPagination } from 'test/utils/buildPagination';
import {
  FoldersGatewayMock,
  mockFolder,
  mockFoldersGateway,
} from 'test/mocks/folders';
import { mockPrisma } from 'test/mocks/prisma';
import { socketId } from 'test/mocks/sockets';
import { GetFoldersPayload } from '@repo/shared/types';

describe('FoldersService', () => {
  let service: FoldersService;
  let gatewayMock: FoldersGatewayMock;

  const userId = 'user-id';
  const newFolderPayload = { name: 'New Folder', userId };
  const folder = mockFolder();

  const expectForbidden = async (count: number, isVerified: boolean) => {
    mockPrisma.user.findUnique.mockResolvedValue({ isVerified });
    mockPrisma.folder.count.mockResolvedValue(count);

    await expect(service.createFolder(newFolderPayload)).rejects.toThrow(
      ForbiddenException,
    );
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    gatewayMock = mockFoldersGateway();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoldersService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: FoldersGateway, useValue: gatewayMock },
      ],
    }).compile();

    service = module.get(FoldersService);
  });

  describe('createFolder', () => {
    it('creates folder and emits event for allowed user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ isVerified: true });
      mockPrisma.folder.count.mockResolvedValue(0);
      mockPrisma.folder.create.mockResolvedValue(folder);

      const result = await service.createFolder(newFolderPayload, socketId);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { isVerified: true },
      });
      expect(mockPrisma.folder.count).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(mockPrisma.folder.create).toHaveBeenCalledWith({
        data: newFolderPayload,
      });
      expect(gatewayMock.emitFolderCreated).toHaveBeenCalledWith(
        folder,
        socketId,
      );
      expect(result).toEqual(folder);
    });

    test.each<{ count: number; isVerified: boolean; desc: string }>([
      { count: 3, isVerified: false, desc: 'unverified has ≥3 folders' },
      { count: 25, isVerified: true, desc: 'verified has ≥25 folders' },
    ])('throws ForbiddenException if $desc', async ({ count, isVerified }) => {
      await expectForbidden(count, isVerified);
    });
  });

  describe('getFolders', () => {
    it('returns paginated result', async () => {
      const folders = [folder];
      const total = folders.length;
      const req: GetFoldersPayload = {
        page: 2,
        limit: 5,
        name: '',
        userId,
      };

      mockPrisma.$transaction.mockResolvedValueOnce([folders, total]);

      const res = await service.getFolders(req);

      expect(mockPrisma.$transaction).toHaveBeenCalledWith(
        buildPagination('folder', req, {
          userId,
          name: { contains: req.name, mode: 'insensitive' },
        }),
      );
      expect(res).toEqual({
        folders,
        page: req.page,
        limit: req.limit,
        total,
        pages: Math.ceil(total / req.limit),
      });
    });
  });

  describe('renameFolder', () => {
    const updatedFolder = mockFolder({ name: 'New name' });

    it('renames existing folder and emits event', async () => {
      mockPrisma.folder.findUnique.mockResolvedValue(folder);
      mockPrisma.folder.update.mockResolvedValue(updatedFolder);

      const res = await service.renameFolder(
        'folder-id',
        updatedFolder.name,
        socketId,
      );

      expect(mockPrisma.folder.findUnique).toHaveBeenCalledWith({
        where: { id: 'folder-id' },
        select: { name: true },
      });
      expect(mockPrisma.folder.update).toHaveBeenCalledWith({
        where: { id: 'folder-id' },
        data: { name: updatedFolder.name },
      });
      expect(gatewayMock.emitFolderRenamed).toHaveBeenCalledWith(
        updatedFolder,
        socketId,
      );
      expect(res).toEqual(updatedFolder);
    });

    it('throws NotFoundException when folder not found', async () => {
      mockPrisma.folder.findUnique.mockResolvedValue(null);
      await expect(service.renameFolder('folder-id', 'any')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteFolder', () => {
    it('deletes folder and emits event', async () => {
      mockPrisma.folder.delete.mockResolvedValue(folder);

      const res = await service.deleteFolder('folder-id', socketId);

      expect(mockPrisma.folder.delete).toHaveBeenCalledWith({
        where: { id: 'folder-id' },
      });
      expect(gatewayMock.emitFolderDeleted).toHaveBeenCalledWith(
        folder,
        socketId,
      );
      expect(res).toEqual(folder);
    });
  });
});
