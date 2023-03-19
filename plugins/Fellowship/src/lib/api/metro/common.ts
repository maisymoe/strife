import { common, findByDisplayName, findByProps } from "@vendetta/metro";
import { General, Forms } from "@vendetta/ui/components";
import { semanticColors, rawColors } from "@vendetta/ui";

// TODO: findByDisplayName -> findByName when it is available

export const Constants = common.constants;
export const Clipboard = common.clipboard;
export const Assets = findByProps("registerAsset");
export const Messages = findByProps("recieveMessage", "sendMessage");
export const Clyde = findByProps("createBotMessage");
export const Avatars = findByProps("BOT_AVATARS");
export const Native = common.ReactNative.NativeModules;
export const React = common.React;
export const Dispatcher = common.FluxDispatcher;
export const Storage = findByProps("getItem");
export const Toasts = common.toasts;
export const Dialog = findByProps("show", "openLazy", "close");
export const Token = findByProps("getToken");
export const REST = findByProps("getAPIBaseURL");
export const Settings = findByProps("watchKeys");
export const Users = findByProps("getCurrentUser");
export const AsyncUsers = findByProps("getUser", "fetchProfile");
export const Navigation = common.navigation;
export const NavigationNative = common.NavigationNative;
export const Theme = findByProps("theme");
export const Linking = common.ReactNative.Linking;
export const StyleSheet = common.stylesheet;
// TODO: Is this okay?
export const ThemeColorMap = { ThemeColorMap: semanticColors, Colors: rawColors };
export const Components = { Forms: Forms, General: General };
export const Locale = findByProps("Messages");
export const Profiles = findByProps("showUserProfile");
export const Lodash = findByProps("debounce", "throttle");
export const Logger = findByDisplayName("Logger");
export const Flux = common.Flux;
export const SVG = findByProps("Svg");
export const Scenes = findByDisplayName("getScreens", false);
export const Moment = common.moment;