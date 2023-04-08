import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { screens } from "..";

const screensModule = findByProps("useSettingScreens");

export default () => after("useSettingScreens", screensModule, (_, ret) => {
    return {
        ...ret,
        VENDETTA_SETTINGS: {
            route: "VendettaSettings",
            getComponent: () => screens.VendettaSettings.render,
        },
        VENDETTA_PLUGINS: {
            route: "VendettaPlugins",
            getComponent: () => screens.VendettaPlugins.render,
        },
        VENDETTA_THEMES: {
            route: "VendettaThemes",
            getComponent: () => screens.VendettaThemes.render,
        },
        VENDETTA_DEVELOPER: {
            route: "VendettaDeveloper",
            getComponent: () => screens.VendettaDeveloper.render,
        },
        VENDETTA_ASSET_BROWSER: {
            route: "VendettaAssetBrowser",
            getComponent: () => screens.VendettaAssetBrowser.render,
        },
        VENDETTA_CUSTOM_PAGE: {
            route: "VendettaCustomPage",
            getComponent: () => screens.VendettaCustomPage.render,
        }
    }
});