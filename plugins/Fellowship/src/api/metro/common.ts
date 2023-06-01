import { common, findByName, findByProps } from "@vendetta/metro";
import { semanticColors, rawColors } from "@vendetta/ui";
import { General, Forms } from "@vendetta/ui/components";

export const Constants = common.constants;
export const Clipboard = common.clipboard;
export const Assets = findByProps("registerAsset");
export const Messages = findByProps("receiveMessage", "sendMessage");
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
export const NavigationStack = common.navigationStack;
export const Theme = findByProps("theme");
export const Linking = common.ReactNative.Linking;
export const StyleSheet = common.stylesheet;
// TODO: Is this okay?
export const ColorMap = { ThemeColorMap: semanticColors, Colors: rawColors };
export const ThemeColorMap = semanticColors;
export const Colors = rawColors
export const Components = { Forms: Forms, General: General };
export const Locale = findByProps("Messages");
export const Profiles = findByProps("showUserProfile");
export const Lodash = findByProps("debounce", "throttle");
export const Logger = findByName("Logger");
export const Flux = common.Flux;
export const SVG = findByProps("Svg");
export const Scenes = findByName("getScreens", false);
export const Moment = common.moment;

Constants.ThemeColorMap = semanticColors;
StyleSheet.ThemeColorMap = semanticColors;