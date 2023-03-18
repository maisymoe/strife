import * as patcher from "./api/patcher";

export default () => {
    globalThis.enmity = {
        patcher,
    };

    return () => delete globalThis.enmity;
}