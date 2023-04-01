import patchYouTab from "./patches/patchYouTab";

const patches = [
    patchYouTab(),
];

export const onUnload = () => patches.forEach(p => p());