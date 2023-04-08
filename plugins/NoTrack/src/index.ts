import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

const Metadata = findByProps("trackWithMetadata");
const { AnalyticsActionHandlers: Analytics } = findByProps("AnalyticsActionHandlers");
const Properties = findByProps("encodeProperties", "track");
const Reporter = findByProps("submitLiveCrashReport");
const Sentry = {
    main: globalThis.__SENTRY__?.hub,
    client: globalThis.__SENTRY__?.hub?.getClient(),
};

const patches = [];
const noopAndPush = (prop, mod) => patches.push(instead(prop, mod, () => {}));

const patchSet = [
    { module: Metadata, prop: "trackWithMetadata" },
    { module: Analytics, prop: "handleTrack" },
    { module: Properties, prop: "track" },
    { module: Reporter, prop: "submitLiveCrashReport" },
]
for (const p of patchSet) p.module?.[p.prop] && noopAndPush(p.prop, p.module);

if (Sentry.main && Sentry.client) {
    Sentry.client.getOptions().enabled = false;
    Sentry.client.close();
    Sentry.main.getStackTop().scope.clear();
    Sentry.main.getScope().clear();
    noopAndPush("addBreadcrumb", Sentry.main);
}

// https://github.com/GooseMod/OpenAsar/blob/7a04cb57dff43f328de78addc234e9d21ff079a8/src/mainWindow.js#L3
try { Object.keys(console).forEach((x) => (console[x] = console[x].__sentry_original__ ?? console[x])) } catch {};

// stop TRACK dispatches from causing science requests
// https://github.com/yellowsink/shelter-plugins/blob/3a62d1557b704f4617f72882edba826218eb8c6e/plugins/antitrack/index.js#L10-L25
const analyticsTest = /client-analytics\.braintreegateway\.com|discord\.com\/api\/v9\/science/;
patches.push(instead(
	"send",
	XMLHttpRequest.prototype,
	function (args, orig) { if (!analyticsTest.test(this.__sentry_xhr__?.url)) return orig.apply(this, args) },
));

// TODO: Maybe potentially probably look into unpatching better? This does not undo all changes (console patches)
export function onUnload() {
    patches.forEach(p => p());
    if (Sentry.main && Sentry.client) {
        Sentry.client.getOptions().enabled = true;
        Sentry.client.open();
    }
}