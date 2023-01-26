import nitroChecks from "./patches/nitroChecks";
import sendMessage from "./patches/sendMessage";

const patches = [
    ...nitroChecks,
    ...sendMessage,
];

export const onUnload = () => patches.forEach(p => p());