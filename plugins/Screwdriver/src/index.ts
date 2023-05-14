import disableBugReporter from "./patches/patchBugReporter";

const patches = [
    disableBugReporter(),
];

export const onUnload = () => patches.forEach(p => p());

export { default as settings } from "./Settings";