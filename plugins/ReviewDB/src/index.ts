import { storage } from "@vendetta/plugin";
import { patchProfile } from "./patches/patchProfile";

// Default settings
// TODO: Do I need to do this?
storage.authToken ??= "";

const patches = [
    patchProfile(),
];

export const onUnload = () => patches.forEach(p => p());

export { default as settings } from "./Settings";