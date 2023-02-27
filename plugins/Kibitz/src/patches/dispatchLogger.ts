import { FluxDispatcher, moment } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import { createProxy } from "@vendetta/storage";
import { Dispatch } from "../def";

export const dispatches = createProxy<Dispatch[]>([]).proxy;

export default () => after("dispatch", FluxDispatcher, (args) => {
    if (!storage.flux.logger.enabled) return;
    dispatches.push({
        time: moment().format("H:mm:ss.SSS"),
        data: args[0],
    });
});