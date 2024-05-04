import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { environment } from '../../../environments/environment.development';
import { AddChatChannelDto } from '../../models/chat-main/add-chat-channel-dto';
import { ChatChannelDto, ChatChannelListDto } from '../../models/chat-main/chat-channel-list-dto';
import { ChatChannelResponseDto } from '../../models/chat-main/chat-channel-response-dto';
import { ChatMessageDto } from '../../models/chat-main/chat-message-dto';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {

  constructor(private httpClient: HttpClientService) { }


  public deleteChatChannel(chatChannelId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + `delete-chat-channel?channelId=${chatChannelId}`;
      this.httpClient.delete(url).subscribe(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

  public addChatChannel(chatChannelName: string): Promise<ChatChannelDto> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + 'add-chat-channel';
      const dto = new AddChatChannelDto(chatChannelName);
      this.httpClient.post(url, dto).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  public getChatChannelList(): Promise<ChatChannelListDto> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + 'chat-channel-list';
      this.httpClient.get(url).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  public getChatChannel(channelId: string): Promise<ChatChannelResponseDto> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + `chat-channel?channelId=${channelId}`;
      this.httpClient.get(url).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  public simpleChatMessage(body: ChatMessageDto): Promise<ChatMessageDto> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + 'simple-chat';
      this.httpClient.post(url, body).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
