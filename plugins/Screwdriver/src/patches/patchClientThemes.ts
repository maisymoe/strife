import { findByProps, findByStoreName } from "@vendetta/metro"
import { before, after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

const clientThemesModule = findByProps("canUseClientThemes");
export const settingsModule = findByProps("setShouldSyncAppearanceSettings");

const setSyncState: (state: boolean) => void = settingsModule.setShouldSyncAppearanceSettings;

export default () => {
    const patches = [];
    
    // Set it to our desired state
    // TODO: Get and restore original state before plugin touched it
    setSyncState(false);

    // Patch it to *always* use our desired state!
    patches.push(before("setShouldSyncAppearanceSettings", settingsModule, (args) => {
        if (!storage.enableClientThemes) return;
        args[0] = false;
    }));

    // Grant permissions to use client themes, doing nothing if already true and using our setting if not
    patches.push(after("canUseClientThemes", clientThemesModule, (_, ret) => ret || storage.enableClientThemes));

    return () => {
        patches.forEach(p => p());
        setSyncState(true);
    }
}