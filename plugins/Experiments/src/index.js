const { findByProps } = vendetta.metro;
const { instead } = vendetta.patcher;

const userMod = findByProps("getUsers");
const nodes = Object.values(findByProps("isDeveloper")._dispatcher._actionHandlers._dependencyGraph.nodes);
try { nodes.find(x => x.name === "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({ user: { flags: 1 } }); } catch {};

let gcUserPatch = instead("getCurrentUser", userMod, () => ({ hasFlag: () => true }));
nodes.find(x => x.name === "DeveloperExperimentStore").actionHandler["OVERLAY_INITIALIZE"]();
gcUserPatch();

export function onUnload() {
    // TODO: Is this really necessary?
    alert("For experiments and other developer features to be disabled, you must restart Discord.");
}