import { patcher } from "@vendetta";

type PatchType = "before" | "instead" | "after";
type PatchSet = Record<PatchType, Function[]>

const patches: Record<string, PatchSet | undefined> = {};

function pushPatch(caller: string, type: PatchType, patch: () => boolean) {
    if (!patches[caller]) patches[caller] = {
        before: [],
        instead: [],
        after: [],
    }

    patches[caller][type].push(patch);
}

function wrapCallback(type: PatchType, callback: Function, original?: Function): any {
    switch (type) {
        case "before": return (args: any[]) => callback(this, args, original);
        case "instead": return (args: any[], orig: Function) => callback(this, args, orig);
        case "after": return (args: any[], ret: any) => callback(this, args, ret);
    }
}

// Wrappers since Enmity has reversed patcher args order and other quirks
export const before = (caller: string, funcParent: any, funcName: string, callback: Function, oneTime: boolean) =>
    pushPatch(caller, "before", patcher.before(funcName, funcParent, wrapCallback("before", callback, funcParent?.[funcName]), oneTime));

export const instead = (caller: string, funcParent: any, funcName: string, callback: Function, oneTime: boolean) =>
    pushPatch(caller, "instead", patcher.instead(funcName, funcParent, wrapCallback("instead", callback), oneTime));

export const after = (caller: string, funcParent: any, funcName: string, callback: Function, oneTime: boolean) =>
    pushPatch(caller, "after", patcher.after(funcName, funcParent, wrapCallback("after", callback), oneTime));

export const getPatchesByCaller = (caller: string) => [...patches[caller].before, ...patches[caller].instead, ...patches[caller].after];
export const unpatchAll = (caller: string) => getPatchesByCaller(caller).forEach(p => p());

export const create = (caller: string) => ({
    getPatchesByCaller: () => getPatchesByCaller(caller),
    before,
    instead,
    after,
    unpatchAll,
});