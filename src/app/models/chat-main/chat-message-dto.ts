export class ChatMessageDto {
    id: string;
    message: string;
    timestamp: Date;
    isChatBot: boolean;
    chatChannelId: number;
    userId: string;
    isFirstMessage: boolean;
  
    constructor(id: string, message: string, timestamp: Date, isChatBot: boolean, chatChannelId: number, userId: string, isFirstMessage: boolean) {
      this.id = id;
      this.message = message;
      this.timestamp = timestamp;
      this.isChatBot = isChatBot;
      this.chatChannelId = chatChannelId;
      this.userId = userId;
      this.isFirstMessage = isFirstMessage;
    }
}