import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface MessagePayload {
  chatId: string;
  sender: string;
  content: string;
}

@WebSocketGateway({
  cors: {
    origin: '*', // 🔒 You can restrict this to your frontend URL later
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger(ChatGateway.name);

  afterInit() {
    this.logger.log('✅ ChatGateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`🟢 Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`🔴 Client disconnected: ${client.id}`);
  }

  // When a user joins a chat room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    this.logger.log(`Client ${client.id} joined room ${roomId}`);
    client.emit('joinedRoom', { roomId });
  }

  // When a user sends a message to a chat
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: MessagePayload) {
    const { chatId, sender, content } = payload;

    if (!chatId || !sender || !content) {
      this.logger.warn(`Invalid message payload from ${client.id}`);
      return;
    }

    this.logger.log(`📩 Message in chat ${chatId} from ${sender}: ${content}`);

    // Broadcast to everyone in that room (including sender)
    this.server.to(chatId).emit('receiveMessage', {
      sender,
      content,
      chatId,
      timestamp: new Date(),
    });
  }
}
