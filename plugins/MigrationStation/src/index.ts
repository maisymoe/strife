import { storage } from "@vendetta/plugin";

// Defaults
storage.includeVendetta ??= true;
storage.includePlugins ??= true;
storage.includePluginData ??= true;
storage.includeThemes ??= true;

export { default as settings } from "./Settings";