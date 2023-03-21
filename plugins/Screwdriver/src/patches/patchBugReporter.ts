import { findByProps, findByStoreName } from "@vendetta/metro"
import { before } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

const DeveloperOptionsStore = findByStoreName("DeveloperOptionsStore");
const devOptsModule = findByProps("setDeveloperOptionSettings");

export const setBugReporterState = (state: boolean) => devOptsModule.setDeveloperOptionSettings({ bugReporterEnabled: state });

export default () => {
    // Store the original state (before patch)
    const oldState = DeveloperOptionsStore.isBugReporterEnabled;

    // Set it to our desired state
    setBugReporterState(!storage.disableBugReporter);

    // Patch it to *always* use our desired state!
    const unpatch = before("setDeveloperOptionSettings", devOptsModule, (args) => {
        if (!storage.disableBugReporter || !args[0]?.bugReporterEnabled) return;
        args[0].bugReporterEnabled = false;
    });

    return () => {
        unpatch();
        setBugReporterState(oldState);
    }
}