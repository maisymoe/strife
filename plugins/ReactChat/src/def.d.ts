export interface Row {
    type: number;
    message: {
        id: string,
        channelId: string,
        guildId: string,
        content: string;
        username: string,
        avatarURL: string,
        authorId: string,
    };
    index: number;
}

export interface StateStore {
    logIndex: number;
    rows: Row[];
}