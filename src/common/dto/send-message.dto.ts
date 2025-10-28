import { IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  sender: string; // user ID

  @IsString()
  content: string;
}
