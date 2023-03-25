import { ReactNative } from "@vendetta/metro/common";
const { InfoDictionaryManager, BundleUpdaterManager, DCDDeviceManager } = ReactNative.NativeModules;

export const bundle = InfoDictionaryManager.Identifier;
export const reload = BundleUpdaterManager.reload;
export const version = InfoDictionaryManager.Version;
export const os = DCDDeviceManager.systemVersion;
export const build = InfoDictionaryManager.Build;
export const device = DCDDeviceManager.device;