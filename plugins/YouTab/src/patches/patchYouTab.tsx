import { i18n, navigation } from "@vendetta/metro/common";
import { findByName, findByStoreName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { identity } from "@vendetta/loader";
import Modal from "../components/Modal";

const useSettingGroups = findByName("useSettingGroups", false);
const getScreens = findByName("getScreens");
const { getCurrentUser } = findByStoreName("UserStore");

export default () => after("default", useSettingGroups, (_, ret) => {
    const { VendettaSettings, VendettaPlugins, VendettaThemes, VendettaDeveloper } = getScreens(getCurrentUser());

    const index = ret.findIndex(i => i.name === i18n.Messages.APP_SETTINGS);
    ret.splice(index, 0, {
        name: "Vendetta",
        settings: [
            {
                name: "General",
                icon: getAssetIDByName("settings"),
                onPress: () => navigation.push(Modal, {
                    title: "General",
                    children: VendettaSettings.render,
                }),
            },
            {
                name: "Plugins",
                icon: getAssetIDByName("debug"),
                onPress: () => navigation.push(Modal, {
                    title: "Plugins",
                    children: VendettaPlugins.render,
                }),
            },
            ...(identity?.features.themes ? [{
                name: "Themes",
                icon: getAssetIDByName("ic_theme_24px"),
                onPress: () => navigation.push(Modal, {
                    title: "Themes",
                    children: VendettaThemes.render,
                }),
            }] : []),
            {
                name: "Developer",
                icon: getAssetIDByName("ic_progress_wrench_24px"),
                onPress: () => navigation.push(Modal, {
                    title: "Developer",
                    children: VendettaDeveloper.render,
                }),
            },
        ]
    });
});