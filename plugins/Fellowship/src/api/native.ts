import { ReactNative } from "@vendetta/metro/common";
const { NativeModules: nm } = ReactNative;

const clientInfo = nm.InfoDictionaryManager ?? nm.RTNClientInfoManager;
const deviceInfo = nm.DCDDeviceManager ?? nm.RTNDeviceManager;
const bundleUpdater = nm.BundleUpdaterManager;

export const bundle = clientInfo.Identifier;
export const reload = bundleUpdater.reload;
export const version = clientInfo.Version;
export const os = deviceInfo.systemVersion;
export const build = clientInfo.Build;
export const device = deviceInfo.device;