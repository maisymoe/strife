const { findByProps } = vendetta.metro;
const { after } = vendetta.patcher;

const userMod = findByProps("getUsers");
const experimentMod = findByProps("isDeveloper");
const nodes = Object.values(experimentMod._dispatcher._actionHandlers._dependencyGraph.nodes);

function setExperiments(state) {
    let gcUserPatch = after("getCurrentUser", userMod, (args, ret) => ({ ...ret, hasFlag: () => state, isStaff: () => state }));
    try { nodes.find(x => x.name === "ExperimentStore").actionHandler["CONNECTION_OPEN"]({ user: { flags: 0 }, type: "CONNECTION_OPEN" }); } catch {};
    
    nodes.find(x => x.name === "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]({});
    experimentMod.initialize.call({ waitFor: () => {}, getName: () => {} });
    
    gcUserPatch();
}

export const onLoad = () => setExperiments(true);
export function onUnload() {
    setExperiments(false);
    // TODO: Offer to do this for the user
    alert("For developer features to be fully disabled, you must restart Discord.");
}