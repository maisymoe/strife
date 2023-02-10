import { findByProps } from "@vendetta/metro";
import { logger } from "@vendetta";

const CurrentUserStore = findByProps("getCurrentUser");
const SerialState = findByProps("getSerializedState");
const Dialog = findByProps('show', 'openLazy', 'close')
const reload = () => findByProps("NativeModules").BundleUpdaterManager.reload;

export default {
    onLoad: () => {
        try {
            const setExperiments = () => {
                CurrentUserStore.getCurrentUser().flags |= 1;
                CurrentUserStore._dispatcher._actionHandlers
                    ._computeOrderedActionHandlers("OVERLAY_INITIALIZE")
                    .forEach(function (e) {
                        e.name.includes("Experiment") &&
                        e.actionHandler({
                            serializedExperimentStore: SerialState.getSerializedState(),
                            user: { flags: 1 },
                        });
                    });
            };
            setTimeout(() => {
                setExperiments();
            }, 500);
        } catch(e) {
            logger.log(`An error has occured with Experiments: ${e}`)
        }
    },
    onUnload: () => {
        Dialog.show({
            title: "Experiments disabled",
            body: "Disabling Experiments requires a restart, would you like to restart Discord?",
            confirmText: "Sure",
            cancelText: "Not now",
            onConfirm: reload,
        });
    }
}