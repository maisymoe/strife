import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { screens } from "..";

const titlesModule = findByProps("useSettingTitles");

export default () => after("useSettingTitles", titlesModule, (_, ret) => ({
    ...ret,
    VENDETTA_SETTINGS: screens.VendettaSettings.title,
    VENDETTA_PLUGINS: screens.VendettaPlugins.title,
    VENDETTA_THEMES: screens.VendettaThemes.title,
    VENDETTA_DEVELOPER: screens.VendettaDeveloper.title,
    VENDETTA_ASSET_BROWSER: screens.VendettaAssetBrowser.title,
    VENDETTA_CUSTOM_PAGE: screens.VendettaCustomPage.title,
}));