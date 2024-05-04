export class AddChatChannelDto {
    public channelName: string;

    constructor(channelName: string) { 
        this.channelName = channelName;
    }
}