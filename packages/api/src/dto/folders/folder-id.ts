import { IsNotEmpty, IsUUID } from 'class-validator';

export class FolderIdDto {
  @IsNotEmpty()
  @IsUUID()
  folderId: string;
}
