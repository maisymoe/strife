import { storage } from "@vendetta/plugin";
import windowObject from "./patches/windowObject";

// Default storage values
// Migration code, shouldn't be needed but :shrug:
if (storage.plugins && !Array.isArray(storage.plugins)) storage.plugins = [];
storage.enabledPlugins ??= [];
storage.disabledPlugins ??= [];

const patches = [
    windowObject(),
];

export const onUnload = () => patches.forEach(p => p());