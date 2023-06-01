import type { Plugin as EnmityPlugin } from "enmity/managers/plugins";
import type { EntityAuthor } from "enmity/common";
import { storage } from "@vendetta/plugin";
import { without } from "@vendetta/utils";
import { stub } from "../utils";
import { registerCommands, unregisterCommands } from "./commands";

// TODO: Work on plugin loader is paused until I've polyfilled the rest of the API

// storage.plugins is for CompatPlugin objs, manifest info, etc
storage.plugins ??= {};

// fuck color, we are a compat layer, not an enmity alternative
interface CompatPlugin {
    name: string;
    description: string;
    version: string;
    authors: EntityAuthor[] | string[];
    script?: string;
    enabled?: boolean;
}

interface RegisteredPlugin {
    onStart: () => void;
    onStop: () => void;
    onEnable: () => void;
    onDisable: () => void;
    // getSettingsPanel?: (props: {
    //     settings: SettingsStore;
    // }) => React.ComponentType;
}

// convenience
let registeredPlugins = {} as Record<string, RegisteredPlugin>;
let plugins = storage.plugins as Record<string, CompatPlugin>;

export function registerPlugin(plugin: EnmityPlugin) {
    if (typeof plugin !== "object") return;
    const url = Object.entries(plugins).find(([, p]) => p.name === plugin.name)[0];
    registeredPlugins[url] = {
        onStart: plugin.onStart,
        onStop: plugin.onStop,
        onEnable: () => {
            try {
                plugin.onStart();
                if (plugin.commands) registerCommands(plugin.name, plugin.commands);
            } catch(e) {
                console.error(`${plugin.name} errored while enabling`, e.message);
            }
        },
        onDisable: () => {
            try {
                // i am convinced this is supposed to be plugin.patchers, so i'll treat it that way
                if (plugin.patches) plugin.patches.forEach(patcher => patcher.unpatchAll());
                if (plugin.commands) unregisterCommands(plugin.name);
                plugin.onStop();
            } catch(e) {
                console.error(`${plugin.name} errored while disabling`, e.message);
            }
        },
    };
}

const mergePlugin = (meta: CompatPlugin, evaluated: RegisteredPlugin): EnmityPlugin => without({ ...meta, ...evaluated }, "script", "enabled");
const mergePlugins = (filter?: ([url, meta]: [string, CompatPlugin]) => boolean) =>
   (filter ? Object.entries(plugins).filter(filter) : Object.entries(plugins)).map(([url, meta]) => mergePlugin(meta, registeredPlugins[url]));

export function getPlugin(name: string): EnmityPlugin {
    const [url, meta] = Object.entries(plugins).find(([, p]) => p.name === name);
    return mergePlugin(meta, registeredPlugins[url]);
}

// i hate this, and i *could* store plugins in the way that enmity expects, however enmity willingly chooses to complicate things as much as possible
// powercord eat your heart out
export const getPlugins = () => mergePlugins();
export const getEnabledPlugins = () => mergePlugins(([, meta]) => meta.enabled);
export const getDisabledPlugins = () => mergePlugins(([, meta]) => !meta.enabled);

const buildRegisterPluginProxy = (url: string) => new Proxy(globalThis.enmity.plugins, {
    get(target, prop) {
        if (prop !== "registerPlugin") return Reflect.get(target, prop);

        return (plugin: EnmityPlugin) => {
            plugins[url] ??= {
                name: plugin.name,
                description: plugin.description,
                version: plugin.version,
                authors: plugin.authors,
            };

            return registerPlugin(plugin);
        };
    },
});

export async function evalPlugin(url: string, enable: boolean = false): Promise<string> {
    const pluginScript = plugins[url]?.script ?? (await (await fetch(url)).text());
    const enmityProxy = {
        ...globalThis.enmity,
        plugins: buildRegisterPluginProxy(url),
    };

    const windowProxy = new Proxy(window, {
        get(target, prop) {
            if (prop === "window") return windowProxy;

            switch (prop) {
                case "vendetta":
                case "__vendetta_theme":
                case "__vendetta_loader":
                case "__vendetta_rdc":
                    return;
                case "enmity":
                    return enmityProxy;
                default:
                    return target[prop];
            }
        },
    });

    try {
        await (0, eval)(`((window, enmity) => { ${pluginScript} })`)(windowProxy, enmityProxy);
    } catch (err) {
        console.error((err as Error).stack);
    }

    // this was wrapped in a try with empty catch when link gave me it, unsure why?
    plugins[url].script = pluginScript;
    plugins[url].enabled = enable;

    return plugins[url].name;
}

export function installPlugin(url: string, callback?: (result) => void) {
    evalPlugin(url, true);
}

export const uninstallPlugin = async () => stub("uninstallPlugin");
