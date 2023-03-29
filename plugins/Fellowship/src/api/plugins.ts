import type { Plugin as EnmityPlugin } from "enmity/managers/plugins";
import { logger } from "@vendetta";
import { storage } from "@vendetta/plugin";
import { stub } from "../utils";

// convenience
const plugins = storage.plugins as EnmityPlugin[];
const enabled = storage.enabledPlugins as string[];
const disabled = storage.disabledPlugins as string[];

export function registerPlugin(plugin: EnmityPlugin) {
    if (typeof plugin !== "object") return;

    plugin.onEnable = () => {
        try {
            plugin.onStart();
        } catch(e) {
            logger.error(`${plugin.name} failed to load...`, e);
        }
    }

    plugin.onDisable = () => {
        try {
            // i feel like this should've been plugin.patchers but alright
            plugin.patches?.forEach(i => i.unpatchAll());

            plugin.onStop();
        } catch (e) {
            logger.error(`${plugin.name} errored while disabling...`, e);
        }
    }

    // TODO: questionable
    if (enabled.includes(plugin.name)) plugin.onEnable();
    if (disabled.includes(plugin.name)) plugin.onDisable();

    if (!getPlugin(plugin.name)) plugins.push(plugin);
}

export const getPlugin = (name: string) => plugins.find(p => p.name === name);
export const getPlugins = () => plugins;
export const getEnabledPlugins = () => enabled;
export const getDisabledPlugins = () => disabled;

// TODO: Are these using correct native "status codes"?
// TODO: Utility for making these "status codes"
export function disablePlugin(name: string, onlyUnload = false, callback?: (result: any) => void) {
    if (enabled.includes(name)) enabled.splice(enabled.indexOf(name), 1);
    if (onlyUnload && disabled.includes(name)) disabled.splice(disabled.indexOf(name), 1);

    if (!onlyUnload) disabled.push(name);
    getPlugin(name).onDisable();

    return new Promise(resolve => {
        callback?.("disabled-plugin");
        resolve("disabled-plugin");
    })
}

export function enablePlugin(name: string, callback?: (result: any) => void) {
    if (disabled.includes(name)) disabled.splice(disabled.indexOf(name), 1);

    enabled.push(name);
    getPlugin(name).onEnable();

    return new Promise(resolve => {
        callback?.("enabled-plugin");
        resolve("enabled-plugin");
    })
}

export const evalPlugin = async () => stub("evalPlugin", "");
export const installPlugin = async () => stub("installPlugin");
export const uninstallPlugin = async () => stub("uninstallPlugin");