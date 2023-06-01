import { Clyde, Avatars, Messages } from "./metro/common";

export function sendReply(channelId: string, content: string | object, username?: string, avatarURL?: string) {
    const message = Clyde.createBotMessage({ channelId: channelId, content: "" });
    message.author.username = username ?? "Fellowship";
    message.author.avatar = avatarURL ? username : "clyde";
    if (avatarURL) Avatars.BOT_AVATARS[username] === avatarURL;

    typeof content === "string" ? message.content = content : Object.assign(message, content);
    Messages.receiveMessage(channelId, message);
}