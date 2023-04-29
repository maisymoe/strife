import { settings } from "@vendetta";
import { config } from "@vendetta/loader"
import { fetchPlugin, plugins, stopPlugin, startPlugin } from "@vendetta/plugins";
import { fetchTheme, selectTheme, themes } from "@vendetta/themes";
import { createMMKVBackend } from "@vendetta/storage";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Backup, BackupOptions, VendettaBackup, PluginBackup } from "../def";
import { create } from "./logger";

// TODO: The "const message" spam around here is gross, but I couldn't magic up a better solution

const log = create("RestoreManager");

export function restoreVendetta(backup: VendettaBackup) {
    for (const key of Object.keys(backup.settings)) settings[key] = backup.settings[key], log(`Restored settings ${key} to ${backup.settings[key]}`);
    if (backup.loaderConfig) for (let key of Object.keys(backup.loaderConfig)) config[key] = backup.loaderConfig[key], log(`Restored loader config ${key} to ${backup.loaderConfig[key]}`);
}

export async function restorePlugins(backup: Record<string, PluginBackup>, restoreData?: boolean) {
    for (const plugin of Object.values(backup)) {
        if (!plugins[plugin.id]) {
            // Try fetching the plugin first, fall back to backup
            await fetchPlugin(plugin.id).catch(() => {
                log(`Couldn't fetch ${plugin.manifest.name}, falling back to local`, "warn");
                try {
                    // @ts-expect-error please stop using the old browser Plugin types
                    plugins[plugin.id] = {
                        id: plugin.id,
                        manifest: plugin.manifest,
                        enabled: plugin.enabled,
                        update: plugin.update,
                        js: plugin.js,
                    }
                } catch(e) {
                    const message = `Failed to restore ${plugin.manifest.name}`;
                    log(`${message}\n${e}`, "error");
                    showToast(message, getAssetIDByName("Small"));
                }
            })
        } else {
            try {
                stopPlugin(plugin.id);
            } catch(e) {
                const message = `Failed to stop ${plugin.manifest.name}`;
                log(`${message}\n${e}`, "error");
                showToast(message, getAssetIDByName("Small"));
            }
        }

        if (plugin.storage && restoreData) await (createMMKVBackend(plugin.id)).set(plugin.storage);
        if (plugin.enabled) await startPlugin(plugin.id)
            .catch(e => {
                const message = `Failed to start ${plugin.manifest.name}`;
                log(`${message}\n${e}`, "error");
                showToast(message, getAssetIDByName("Small"));
            });

        log(`Restored ${plugin.manifest.name}`);
    }
}

export async function restoreThemes(backup: Record<string, Theme>) {
    for (const theme of Object.values(backup)) {
        if (!themes[theme.id]) {
            // Try fetching the theme first, fall back to backup
            await fetchTheme(theme.id).catch(() => {
                try {
                    themes[theme.id] = {
                        id: theme.id,
                        selected: theme.selected,
                        data: theme.data,
                    }
                } catch(e) {
                    const message = `Failed to restore ${theme.data.name}`;
                    log(`${message}\n${e}`, "error");
                    showToast(message, getAssetIDByName("Small"));
                }
            })
        }

        if (theme.selected) await selectTheme(theme.id);
        log(`Restored${theme.selected ? " and selected " : " "}${theme.data.name}`);
    }
}

export default async function restore(backup: Backup, options: BackupOptions) {
    if (Object.keys(options).length === 0) throw new Error("At least one option should be selected");
    if (options.pluginData && !options.plugins) throw new Error("Plugin data cannot be restored independently of plugins");
    
    log(`Starting restore with ${Object.keys(options).join(", ")}`);

    if (options.vendetta && backup.vendetta) restoreVendetta(backup.vendetta);
    if (options.plugins && backup.plugins) await restorePlugins(backup.plugins, options.pluginData);
    if (options.themes && backup.themes) await restoreThemes(backup.themes);
}