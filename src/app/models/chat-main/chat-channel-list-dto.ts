export class ChatChannelDto {
    id: string;              
    chatChannelName: string;
    userId: string;
    
    constructor(id: string, chatChannelName: string, userId: string) {
        this.id = id;
        this.chatChannelName = chatChannelName;
        this.userId = userId;
    }
}

export class ChatChannelListDto {
    public chatChannels: ChatChannelDto[];

    constructor(chatChannels: ChatChannelDto[]) {
        this.chatChannels = chatChannels;
    }
}