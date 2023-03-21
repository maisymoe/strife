import { storage } from "@vendetta/plugin";
import disableBugReporter from "./patches/patchBugReporter";

// Default settings
storage.disableBugReporter ??= false;

const patches = [
    disableBugReporter(),
];

export const onUnload = () => patches.forEach(p => p());

export { default as settings } from "./Settings";