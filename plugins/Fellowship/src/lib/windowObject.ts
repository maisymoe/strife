import * as patcher from "./api/patcher";
import * as metro from "./api/metro";
import * as common from "./api/metro/common";

export default () => {
    globalThis.enmity = {
        patcher,
        metro: { ...metro, common: common }
    };

    return () => delete globalThis.enmity;
}