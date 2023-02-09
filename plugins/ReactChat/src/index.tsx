import { findByDisplayName } from "@vendetta/metro";
import { instead } from "@vendetta/patcher"
import Chat from "./components/Chat";

const patches = [];
const DiscordChat = findByDisplayName("Chat");

patches.push(instead("render", DiscordChat.prototype, () => <Chat />));

export const onUnload = () => patches.forEach(p => p());