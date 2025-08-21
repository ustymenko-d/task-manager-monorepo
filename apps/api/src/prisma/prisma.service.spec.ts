import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();

    prismaService.$connect = jest.fn(async () => Promise.resolve());
    prismaService.$disconnect = jest.fn(async () => Promise.resolve());
  });

  describe('onModuleInit', () => {
    it('should call $connect', async () => {
      await prismaService.onModuleInit();
      expect(prismaService.$connect).toHaveBeenCalled();
    });
  });

  describe('onModuleDestroy', () => {
    it('should call $disconnect', async () => {
      await prismaService.onModuleDestroy();
      expect(prismaService.$disconnect).toHaveBeenCalled();
    });
  });
});
