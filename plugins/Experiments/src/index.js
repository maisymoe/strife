const { findByProps } = vendetta.metro;
const { after } = vendetta.patcher;

const userMod = findByProps("getUsers");
const experimentMod = findByProps("isDeveloper");
const nodes = Object.values(experimentMod._dispatcher._actionHandlers._dependencyGraph.nodes);

let gcUserPatch = after("getCurrentUser", userMod, (args, ret) => ({ ...ret, hasFlag: () => true, isStaff: () => true }));
try { nodes.find(x => x.name === "ExperimentStore").actionHandler["CONNECTION_OPEN"]({ user: { flags: 1 }, type: "CONNECTION_OPEN" }); } catch {};

nodes.find(x => x.name === "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]({});
experimentMod.initialize.call({ waitFor: () => {}, getName: () => {} });

gcUserPatch();

export function onUnload() {
    // TODO: Is this really necessary?
    alert("For experiments and other developer features to be disabled, you must restart Discord.");
}