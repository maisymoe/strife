const { findByProps } = vendetta.metro;

const userMod = findByProps("getCurrentUser","_dispatcher");

function setExperiments() {
    userMod.getCurrentUser().flags += 1
    userMod._dispatcher._actionHandlers._computeOrderedActionHandlers("OVERLAY_INITIALIZE").forEach((function(e) {
        e.name.includes("Experiment") && e.actionHandler({
            serializedExperimentStore: findByProps("getSerializedState").getSerializedState(), user: { flags: 1 }
        })
    }))
    userMod.getCurrentUser().flags -= 1
}

export const onLoad = () => setExperiments();
export function onUnload() {
    // TODO: Offer to do this for the user
    alert("For developer features to be fully disabled, you must restart Discord.");
}
