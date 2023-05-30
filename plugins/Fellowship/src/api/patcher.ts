import { patcher } from "@vendetta";

type PatchType = "before" | "instead" | "after";
type PatchSet = Record<PatchType, Function[]>;

const patches: Record<string, PatchSet | undefined> = {};

function pushPatch(caller: string, type: PatchType, patch: () => boolean) {
    if (!patches[caller]) patches[caller] = {
        before: [],
        instead: [],
        after: [],
    };

    patches[caller][type].push(patch);
    return { unpatch: patch };
}

function wrapCallback(type: PatchType, callback: Function) {
    switch (type) {
        case "before": return function (args: any[], orig: Function) { callback(this, args, orig); return orig(...args) };
        case "instead": return function (args: any[], orig: Function) { return callback(this, args, orig) };
        case "after": return function (args: any[], ret: any) { return callback(this, args, ret) };
    }
}

// Wrappers since Enmity has reversed patcher args order and other quirks
export const before = (caller: string, funcParent: any, funcName: string, callback: Function, oneTime: boolean) =>
    pushPatch(caller, "before", patcher.instead(funcName, funcParent, wrapCallback("before", callback), oneTime));

export const instead = (caller: string,funcParent: any,funcName: string,callback: Function,oneTime: boolean) =>
    pushPatch(caller, "instead", patcher.instead(funcName, funcParent, wrapCallback("instead", callback), oneTime));

export const after = (caller: string,funcParent: any,funcName: string,callback: Function,oneTime: boolean) =>
    pushPatch(caller, "after", patcher.after(funcName, funcParent, wrapCallback("after", callback), oneTime));

export const getPatchesByCaller = (caller: string) => [
    ...patches[caller].before,
    ...patches[caller].instead,
    ...patches[caller].after,
];

export const unpatchAll = (caller: string) => getPatchesByCaller(caller).forEach((p) => p());

export const create = (caller: string) => ({
    getPatchesByCaller: () => getPatchesByCaller(caller),
    before: (funcParent, funcName, callback, oneTime) => before(caller, funcParent, funcName, callback, oneTime),
    instead: (funcParent, funcName, callback, oneTime) => instead(caller, funcParent, funcName, callback, oneTime),
    after: (funcParent, funcName, callback, oneTime) => after(caller, funcParent, funcName, callback, oneTime),
    unpatchAll: () => unpatchAll(caller),
});
