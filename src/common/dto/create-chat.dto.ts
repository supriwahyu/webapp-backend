import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  participants: string[]; // user IDs
}
