import { storage } from "@vendetta/plugin";
import windowObject from "./patches/windowObject";

// Default storage values
storage.plugins ??= {};

const patches = [
    windowObject(),
];

export const onUnload = () => patches.forEach(p => p());