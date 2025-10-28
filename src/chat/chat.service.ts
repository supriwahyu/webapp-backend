import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateChatDto } from '../common/dto/create-chat.dto';
import { SendMessageDto } from '../common/dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  // Create a new chat
  async createChat(createChatDto: CreateChatDto) {
    const chat = new this.chatModel({
      name: createChatDto.name,
      participants: createChatDto.participants,
    });
    return await chat.save();
  }

  // Get chat by ID with messages
  async getChat(chatId: string) {
    const chat = await this.chatModel
      .findById(chatId)
      .populate('participants', '-password')
      .populate('messages')
      .exec();

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    return chat;
  }

  // Send a message to a chat
  async sendMessage(chatId: string, sendMessageDto: SendMessageDto) {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) throw new NotFoundException('Chat not found');

    const message = new this.messageModel({
      chat: chatId,
      sender: sendMessageDto.sender,
      content: sendMessageDto.content,
    });

    const savedMessage = await message.save();

    (chat.messages as Types.ObjectId[]).push(savedMessage._id as Types.ObjectId);
    await chat.save();

    return savedMessage;
  }
}
