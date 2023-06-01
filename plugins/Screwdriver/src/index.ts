import { storage } from "@vendetta/plugin";
import disableBugReporter from "./patches/patchBugReporter";
import patchAddFiles from "./patches/patchAddFiles";
import patchClientThemes from "./patches/patchClientThemes";

// Default settings
storage.fixJSONUploads ??= true;

const patches = [
    disableBugReporter(),
    patchAddFiles(),
    patchClientThemes(),
];

export const onUnload = () => patches.forEach(p => p());

export { default as settings } from "./Settings";