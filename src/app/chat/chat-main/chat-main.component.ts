import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ChatChannelDto, ChatChannelListDto } from '../../models/chat-main/chat-channel-list-dto';
import { ChatChannelResponseDto } from '../../models/chat-main/chat-channel-response-dto';
import { ChatMessageDto } from '../../models/chat-main/chat-message-dto';
import { MaterialModule } from '../../modules/material.module';
import { SharedModule } from '../../modules/shared.module';
import { AuthGuardService } from '../../services/http/auth-guard.service';
import { ChatHttpService } from '../../services/http/chat-http.service';
import { Typewriter } from '../../shared/typewriter/typewriter';
import { AddChatChannelComponent } from '../add-chat-channel/add-chat-channel.component';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  standalone: true,
  imports: [MaterialModule, SharedModule, ReactiveFormsModule]
})
export class ChatMainComponent implements OnInit, OnDestroy {
  @ViewChild('drawer')
  drawer!: MatDrawer;

  @ViewChild('chatHistory', {static: false})
  chatHistory!: ElementRef;

  @ViewChildren('chatMessage')
  uiChatMessages!: QueryList<ElementRef>;

  public isLoading: boolean = true;
  public chatChannels: ChatChannelDto[] = [];
  public chatMessages: ChatMessageDto[] = [];
  public currentChatChannelId!: number;
  public currentUserId!: string;
  public selectedChannelId!: string;
  public inputForm!: FormGroup;


  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private chatHttpService: ChatHttpService,
    private authGuardService: AuthGuardService,
    private dialog: MatDialog
  ) { }


  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  async ngOnInit() {
    try {
      this.currentUserId = this.authGuardService.getDecodedToken()?.userId;
      const chatChannelListResponse: ChatChannelListDto = await this.chatHttpService.getChatChannelList();
      this.chatChannels.push(...chatChannelListResponse.chatChannels);
      const chatChannelResponse: ChatChannelResponseDto = await this.chatHttpService.getChatChannel(chatChannelListResponse.chatChannels[0].id);
      this.currentChatChannelId = chatChannelResponse.channelId;
      this.chatMessages.push(...chatChannelResponse.chatMessages);
      this.isLoading = false;
      setTimeout(() => {
        if (this.chatChannels?.length > 5) {
          // TODO: scroll to bottom of chat history
        }
      }, 100);
      this.inputForm = this.formBuilder.group({
        input: ['', Validators.required]
      });
    } catch (error) {

     }
  }

  public openDrawer(): void {
    this.drawer.toggle();
  }

  public addChatChannel(): void {
    const dialog = this.dialog.open(AddChatChannelComponent);
    dialog.componentInstance.addChatChannelEvent.subscribe((channelName: string) => {
      this.chatHttpService.addChatChannel(channelName).then((response: ChatChannelDto) => {
        this.chatChannels.push(response);
      });
    });
  }

  public handleChatChannelChanged(event: MatRadioChange): void {
    this.chatHttpService.getChatChannel(event.value).then((response: ChatChannelResponseDto) => {
      this.currentChatChannelId = response.channelId;
      this.chatMessages = response.chatMessages;
    });
  }


  public animateChat(chatMessage: ChatMessageDto, chatIndex: number) {
    if (this.uiChatMessages) {
      const elementRef = this.uiChatMessages.find((element, index) => index === chatIndex)?.nativeElement;
      if (elementRef?.getAttribute('isChatTyped') === "false") {
        elementRef.setAttribute('isChatTyped', true);
        if (chatMessage.isChatBot && !chatMessage.isFirstMessage) {
          const typeWriter = new Typewriter(elementRef, { loop: false, typingSpeed: 25, deletingSpeed: 50});
          typeWriter.scrollNotificationSubject.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
            // TODO: scroll to bottom of chat history
          });
          typeWriter.typeString(chatMessage.message).start().then(() => {
            // TODO: scroll to bottom of chat history
          });
        } else {
          elementRef.append(chatMessage.message);
        }
      }
    }
  }

  public deleteChannel(event: MouseEvent, chatChannel: ChatChannelDto): void {
    event.stopPropagation();
    this.chatHttpService.deleteChatChannel(chatChannel.id).then(() => {
      this.chatChannels = this.chatChannels.filter((channel) => channel.id !== chatChannel.id);
    });
  }

  public async handleInputSend(): Promise<void> {
    try {
        const message = this.inputForm.get('input')?.value;
        const newChatMessage = new ChatMessageDto(uuidv4(), message, new Date(), false, this.currentChatChannelId, this.currentUserId, false);
        this.chatMessages.push(newChatMessage);
        this.inputForm.reset();
        setTimeout(() => {
          // TODO: scroll to bottom of chat history
        }, 100);
        const response: ChatMessageDto = await this.chatHttpService.simpleChatMessage(newChatMessage);
        this.chatMessages.push(response);
        setTimeout(() => {
          // TODO: scroll to bottom of chat history
        }, 100)
    } catch (error: any) {
      console.error(error);
    }
  }
}
