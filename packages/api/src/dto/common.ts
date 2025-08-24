import { IsInt, IsPositive, Min } from 'class-validator';
import { applyDecorators } from '@nestjs/common';

const paginationRulesDto = [IsInt(), IsPositive(), Min(1)];

export class PaginationDto {
  @applyDecorators(...paginationRulesDto)
  page: number;

  @applyDecorators(...paginationRulesDto)
  limit: number;
}
