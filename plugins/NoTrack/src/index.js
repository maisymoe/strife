import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

const Metadata = findByProps("trackWithMetadata");
const Analytics = findByProps("AnalyticsActionHandlers");
const Properties = findByProps("encodeProperties", "track");
const Reporter = findByProps("submitLiveCrashReport");

const patches = [];

const Sentry = {
    main: window.__SENTRY__?.hub,
    client: window.__SENTRY__?.hub?.getClient(),
};

if (Metadata) {
    patches.push(instead("trackWithMetadata", Metadata, () => {}));
    // patches.push(instead("trackWithGroupMetadata", Metadata, Metadata, () => {}));
}

if (Analytics) {
    patches.push(instead("handleTrack", Analytics.AnalyticsActionHandlers, () => {}));
}

if (Properties) {
    patches.push(instead("track", Properties, () => {}));
}

if (Reporter) {
    patches.push(instead("submitLiveCrashReport", Reporter, () => {}));
}

if (Sentry.main && Sentry.client) {
    Sentry.client.close();
    Sentry.main.getStackTop().scope.clear();
    Sentry.main.getScope().clear();
    patches.push(instead("addBreadcrumb", Sentry.main, () => {}));
}

export function onUnload() {
    patches.forEach(p => p());
    if (Sentry.main && Sentry.client) {
        Sentry.client.getOptions().enabled = true;
    }
}