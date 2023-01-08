const { findByProps } = vendetta.metro;

const userMod = findByProps("getCurrentUser");
const experimentMod = findByProps("getSerializedState");
const handlers = userMod._dispatcher._actionHandlers._computeOrderedActionHandlers("OVERLAY_INITIALIZE").filter(h => h.name.includes("Experiment"));

userMod.getCurrentUser().flags |= 1;
for (let h of handlers) h.actionHandler({ serializedExperimentStore: experimentMod.getSerializedState(), user: { flags: 1 } });

export function onUnload() {
    // TODO: Is this really necessary?
    alert("For developer features to be fully disabled, you must restart Discord.");
}