import windowObject from "./patches/windowObject";

const patches = [
    windowObject(),
];

export const onUnload = () => patches.forEach(p => p());
