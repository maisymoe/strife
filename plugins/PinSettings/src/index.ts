import { storage } from "@vendetta/plugin";
import patchSettings from "./patches/patchSettings";

// TODO: This should be an array, but storage does not properly react to array operations yet.
storage.pinnedPlugins ??= {};
storage.appendExisting ??= false;

const patches = [
    patchSettings(),
]

export const onUnload = () => patches.forEach(p => p());
export { default as settings } from "./Settings";