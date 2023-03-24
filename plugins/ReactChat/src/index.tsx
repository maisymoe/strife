import { findByName } from "@vendetta/metro";
import { instead } from "@vendetta/patcher"
import { initInterceptor } from "./patches/interceptor";
import Chat from "./components/Chat";
const DiscordChat = findByName("Chat");

const patches = [
    initInterceptor(),
    instead("render", DiscordChat.prototype, () => <Chat />),
];

export const onUnload = () => patches.forEach(p => p());