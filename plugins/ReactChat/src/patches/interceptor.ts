import { ReactNative } from "@vendetta/metro/common";
import { createProxy } from "@vendetta/storage";
import { after } from "@vendetta/patcher";
import { StateStore } from "../def";

export const state = createProxy<StateStore>({
    logIndex: 0,
    rows: [],
}).proxy;

// TODO: Proper behaviour
// updateRows' native behaviour (presumably) has a map of IDs -> rows. That way, they don't have to send ALL the rows over the bridge on e.g. a new message.
// We also need to do that.
export const initInterceptor = () => after("updateRows", ReactNative.NativeModules.DCDChatManager, (args) => {
    // args[0] is used for logging. I probably don't need it, but I'm assigning it to state store anyway.
    state.logIndex = args[0];
    // args[1] is the messages themselves, in an array.
    state.rows = JSON.parse(args[1]);
    // args[2] is a seemingly unused boolean. Not assigning.
})