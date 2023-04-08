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
        // https://github.com/Vendicated/Vencord/blob/7c514e4b1dae25f48b20bc6d5f3025c22e231450/src/plugins/anonymiseFileNames.ts#L70-L71
        const extIdx = i.filename.lastIndexOf(".");
        const ext = extIdx !== -1 ? i.filename.slice(extIdx) : "";

        const name = randomString(length);

        // why are there two. why???
        // and yes, i checked, setting both is required...
        i.filename = name + ext;
        if (i.item) i.item.filename = name + ext;
    }
});

export { default as settings } from "./Settings";