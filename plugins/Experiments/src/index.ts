import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { Handler } from "./def";

const userMod = findByProps("getUsers");
const experimentMod = findByProps("isDeveloper");
const nodes: Handler[] = Object.values(experimentMod._dispatcher._actionHandlers._dependencyGraph.nodes);

function setExperiments(state: boolean) {
    let gcUserPatch = after("getCurrentUser", userMod, (args, ret) => ({ ...ret, hasFlag: () => state, isStaff: () => state }));
    try { nodes.find((x: Handler) => x.name === "ExperimentStore").actionHandler["CONNECTION_OPEN"]({ user: { flags: state ? 1 : 0 }, type: "CONNECTION_OPEN" }); } catch {};
    
    nodes.find((x: Handler) => x.name === "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]({});
    experimentMod.initialize.call({ waitFor: () => {}, getName: () => {} });
    
    gcUserPatch();
}

export const onLoad = () => setExperiments(true);
export function onUnload() {
    setExperiments(false);
    // TODO: Offer to do this for the user
    alert("For developer features to be fully disabled, you must restart Discord.");
}