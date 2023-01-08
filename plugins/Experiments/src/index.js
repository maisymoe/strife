const { findByProps } = vendetta.metro;

const userMod = findByProps("getCurrentUser");
const experimentMod = findByProps("getSerializedState");
const handlers = userMod._dispatcher._actionHandlers._computeOrderedActionHandlers("OVERLAY_INITIALIZE").filter(h => h.name.includes("Experiment"));
const origFlags = userMod.getCurrentUser().flags;

function setExperiments(flags, expStore, bitwise = false) {
    if (bitwise) {
        userMod.getCurrentUser().flags |= 1;
    } else {
        userMod.getCurrentUser().flags = flags;
    }
    for (let h of handlers) h.actionHandler({ serializedExperimentStore: expStore, user: { flags: flags } });
}

setExperiments(1, experimentMod.getSerializedState(), true);

export function onUnload() {
    setExperiments(origFlags, {
        guildExperimentOverrides: {},
        hasLoadedExperiments: false,
        loadedGuildExperiments: {},
        loadedUserExperiments: {},
        trackedExposureExperiments: {},
        userExperimentOverrides: {},
    });
    alert("For experiments and other developer features to be disabled, you must restart Discord.");
}