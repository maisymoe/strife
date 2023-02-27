import { storage } from "@vendetta/plugin";
import dispatchLogger from "./patches/dispatchLogger";

// Default settings
storage.flux ??= {
    logger: {
        enabled: false,
        ignoreList: "",
    }
};

const patches = [
    dispatchLogger(),
];

export function onUnload() {
    patches.forEach(p => p());
}

export { default as settings } from "./pages/General";