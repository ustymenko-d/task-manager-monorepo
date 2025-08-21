import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from '@repo/api/links/dto/create-link.dto';
import { UpdateLinkDto } from '@repo/api/links/dto/update-link.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto) {
    return this.prisma.link.create({
      data: createLinkDto,
    });
  }

  async findAll() {
    return this.prisma.link.findMany();
  }

  async findOne(id: string) {
    return this.prisma.link.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    return this.prisma.link.update({
      where: { id },
      data: updateLinkDto,
    });
  }

  async remove(id: string) {
    return this.prisma.link.delete({
      where: { id },
    });
  }
}
