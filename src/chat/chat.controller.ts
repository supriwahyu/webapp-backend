import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from '../common/dto/create-chat.dto';
import { SendMessageDto } from '../common/dto/send-message.dto';

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('chat')
  async createChat(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @Get('chat/:chatId')
  async getChat(@Param('chatId') chatId: string) {
    return await this.chatService.getChat(chatId);
  }

  @Post(':chatId/sendMessage')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return await this.chatService.sendMessage(chatId, sendMessageDto);
  }
}
