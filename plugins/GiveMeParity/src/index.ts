import patchGuildSettings from "./patches/patchGuildSettings";

const patches = [
    patchGuildSettings(),
];

export const onUnload = () => patches.forEach(p => p());
