import { storage } from "@vendetta/plugin";

// Default settings
// TODO: Do I need to do this?
storage.authToken ??= "";

const patches = [];

export const onUnload = () => patches.forEach(p => p());

export { default as settings } from "./Settings";