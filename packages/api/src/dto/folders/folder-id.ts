import { IsNotEmpty, IsUUID } from 'class-validator';

export class FolderIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
