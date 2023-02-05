import { storage } from "@vendetta/plugin";
import nitroChecks from "./patches/nitroChecks";
import sendMessage from "./patches/sendMessage";

// Default settings
storage.emojiSize ??= "64";

const patches = [
    ...nitroChecks,
    ...sendMessage,
];

export const onUnload = () => patches.forEach(p => p());
export { default as settings } from "./Settings";