import { settings } from "@vendetta";
import { config, identity } from "@vendetta/loader";
import { plugins } from "@vendetta/plugins";
import { themes } from "@vendetta/themes";
import { createMMKVBackend } from "@vendetta/storage";
import { Backup, BackupOptions, PluginBackup } from "../def";

export const formatVendetta = () => ({
    settings,
    ...(identity?.features?.loaderConfig && { loaderConfig: config }),
})

export async function formatPlugins(backupData?: boolean) {
    const finalPlugins: Record<string, PluginBackup> = {};

    for (const plugin of Object.values(plugins)) finalPlugins[plugin.id] = ({
        ...plugin,
        ...(backupData && { storage: await (createMMKVBackend(plugin.id)).get() as object ?? {} }),
    });
    
    return finalPlugins;
}

export function formatThemes() {
    const finalThemes: Record<string, Theme> = {};
    for (const theme of Object.values(themes)) finalThemes[theme.id] = theme;
    
    return finalThemes;
}

export default async function backup(options: BackupOptions) {
    if (Object.keys(options).length === 0) throw new Error("At least one option should be selected");
    if (options.pluginData && !options.plugins) throw new Error("Plugin data cannot be backed up independently of plugins");

    const backup: Backup = {};
    if (options.vendetta) backup.vendetta = formatVendetta();
    if (options.plugins) backup.plugins = await formatPlugins(options.pluginData);
    if (options.themes) backup.themes = formatThemes();

    return backup;
}