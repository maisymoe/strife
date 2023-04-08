import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import randomString from "./lib/randomString";

// Default settings
storage.nameLength ??= 8;

const uploadModule = findByProps("uploadLocalFiles");

export const onUnload = before("uploadLocalFiles", uploadModule, (args) => { 
    const { items } = args[0];
    if (!items) return;

    const rawLength = parseInt(storage.nameLength);
    const length = isNaN(rawLength) ? 8 : rawLength;

    for (const i of items) {
        const name = randomString(length);

        // why are there two. why???
        i.filename = name;
        if (i.item) i.item.filename = name;
    }
});

export { default as settings } from "./Settings";