import network from "./lib/network";
import console from "./lib/console";
import miscellanous from "./lib/miscellanous";
import sentry from "./lib/sentry";

const patches = [
    network(),
    console(),
    miscellanous(),
    // TODO: This patch is supposedly causing crashing and I do not know why
    // sentry(),
];

export function onUnload() {
    patches.forEach(p => p());
}
