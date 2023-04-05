import { settings } from "@vendetta";
import { config } from "@vendetta/loader"
// @ts-expect-error
// TODO: Fix this in vendetta-types, startPlugin just isn't listed???
import { fetchPlugin, plugins, stopPlugin, startPlugin } from "@vendetta/plugins";
import { fetchTheme, selectTheme, themes } from "@vendetta/themes";
import { createMMKVBackend } from "@vendetta/storage";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Backup, BackupOptions, VendettaBackup, PluginBackup } from "../def";

export function restoreVendetta(backup: VendettaBackup) {
    for (const key of Object.keys(backup.settings)) settings[key] = backup.settings[key];
    if (backup.loaderConfig) for (let key of Object.keys(backup.settings)) config[key] = backup.loaderConfig[key];
}

export async function restorePlugins(backup: Record<string, PluginBackup>, restoreData?: boolean) {
    for (const plugin of Object.values(backup)) {
        if (!plugins[plugin.id]) {
            // Try fetching the plugin first, fall back to backup
            // @ts-expect-error
            // TODO: Fix this in vendetta-types, some plugin functions are not marked as async when they should be
            await fetchPlugin(plugin.id, false).catch(() => {
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
                    showToast(`Failed to restore ${plugin.manifest.name}, ${(e as Error).message}`, getAssetIDByName("Small"));
                }
            })
        } else {
            try {
                stopPlugin(plugin.id);
            } catch(e) {
                showToast(`Failed to stop ${plugin.manifest.name}, ${(e as Error).message}`, getAssetIDByName("Small"));
            }
        }

        if (plugin.storage && restoreData) await (createMMKVBackend(plugin.id)).set(plugin.storage);
        if (plugin.enabled) await startPlugin(plugin.id)
            .catch(e => showToast(`Failed to start ${plugin.manifest.name}, ${e.message}`, getAssetIDByName("Small")));
    }
}

export async function restoreThemes(backup: Record<string, Theme>) {
    for (const theme of Object.values(backup)) {
        if (!themes[theme.id]) {
            // Try fetching the theme first, fall back to backup
            // @ts-expect-error
            // TODO: Fix this in vendetta-types, some theme functions are not marked as async when they should be
            await fetchTheme(theme.id).catch(() => {
                try {
                    themes[theme.id] = {
                        id: theme.id,
                        selected: theme.selected,
                        // TODO: This might break with unprocessed data
                        data: theme.data,
                    }
                } catch(e) {
                    showToast(`Failed to restore ${theme.data.name}, ${(e as Error).message}`, getAssetIDByName("Small"));
                }
            })
        }

        if (theme.selected) await selectTheme(theme.id);
    }
}

export default async function restore(backup: Backup, options: BackupOptions) {
    if (options.vendetta && backup.vendetta) restoreVendetta(backup.vendetta);
    if (options.plugins && backup.plugins) await restorePlugins(backup.plugins, options.pluginData);
    if (options.themes && backup.themes) await restoreThemes(backup.themes);
}