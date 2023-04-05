import { storage } from "@vendetta/plugin";

// Defaults
storage.backupVendetta ??= true;
storage.backupPlugins ??= true;
storage.backupPluginData ??= true;
storage.backupThemes ??= true;

export { default as settings } from "./pages/Home";