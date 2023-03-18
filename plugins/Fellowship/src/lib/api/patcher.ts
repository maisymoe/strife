import { patcher } from "@vendetta";
import { stub } from "../utils";

type PatchType = "before" | "instead" | "after";
function wrapCallback (type: PatchType, callback: Function, original?: Function): any {
    switch (type) {
        case "before": return (args: any[]) => callback(this, args, original);
        case "instead": return (args: any[], orig: Function) => callback(this, args, orig);
        case "after": return (args: any[], ret: any) => callback(this, args, ret);
    }
}

// Wrappers since Enmity has reversed patcher args order and other quirks
// TODO: Do I need to actually implement the caller functionality?
export const before = (caller: string, funcParent: any, funcName: string, callback: Function, oneTime: boolean) => patcher.before(funcName, funcParent, wrapCallback("before", callback, funcParent?.[funcName]), oneTime);
export const instead = (caller: string, funcParent: any, funcName: string, callback: Function, oneTime: boolean) => patcher.instead(funcName, funcParent, wrapCallback("before", callback), oneTime);
export const after = (caller: string, funcParent: any, funcName: string, callback: Function, oneTime: boolean) => patcher.after(funcName, funcParent, wrapCallback("after", callback), oneTime);

export const create = () => ({
    getPatchesByCaller: () => stub("getPatchesByCaller", []),
    before,
    instead,
    after,
    unpatchAll: () => stub("unpatchAll"),
});