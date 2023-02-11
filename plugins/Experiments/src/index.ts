import { ReactNative } from "@vendetta/metro/common";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { logger } from "@vendetta";

const { getSerializedState } = findByProps("getSerializedState");
const UserStore = findByStoreName("UserStore");
const Dialog = findByProps("show", "openLazy", "close");

try {
    // Add 1 (staff) to local user flags
    UserStore.getCurrentUser().flags += 1;

    // Filter for action handlers on event OVERLAY_INITIALIZE that have "Experiment" in their name
    const actionHandlers = UserStore._dispatcher._actionHandlers._computeOrderedActionHandlers("OVERLAY_INITIALIZE").filter(e => e.name.includes("Experiment"));

    // Call those action handlers with fake data
    for (let a of actionHandlers) {
        a.actionHandler({
            serializedExperimentStore: getSerializedState(),
            user: { flags: 1 },
        });
    }

    // Remove 1 from local user flags, removing staff badge but leaving experiments intact
    UserStore.getCurrentUser().flags -= 1;
} catch(e) {
    logger.log(`Experiments: Failed to enable experiments...`, e);
}

export const onUnload = () => Dialog.show({
    title: "Wait!",
    body: "Disabling experiments requires a restart - would you like to do that now?",
    confirmText: "Sure",
    cancelText: "Not now",
    onConfirm: ReactNative.NativeModules.BundleUpdaterManager.reload,
});