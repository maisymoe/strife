import { storage } from "@vendetta/plugin";
import windowObject from "./lib/windowObject";

// Default storage values
storage.plugins ??= {};

const patches = [
    windowObject(),
];

export const onUnload = () => patches.forEach(p => p());