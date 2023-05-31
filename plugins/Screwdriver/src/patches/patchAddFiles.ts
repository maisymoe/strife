import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

// This method was originally discovered by acquite#0001 (581573474296791211), thank you!

const fileModule = findByProps("addFiles", "popFirstFile");

export default () => before("addFiles", fileModule, (args) => {
    if (!storage.fixJSONUploads) return;
    args[0]?.files.forEach(file => { file.mimeType === "application/json" && (file.mimeType = "text/plain") });
});