import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '../common';

export class GetTasksRequestDto extends PaginationDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsBoolean()
	completed?: boolean;

	@IsOptional()
	@IsBoolean()
	topLayerTasks?: boolean;

	@IsOptional()
	@IsUUID()
	taskId?: string;

	@IsOptional()
	@IsUUID()
	folderId?: string | null;
}
