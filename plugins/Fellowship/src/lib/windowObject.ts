import * as patcher from "./api/patcher";
import * as metro from "./api/metro";
import * as common from "./api/metro/common";
import { plugin } from "@vendetta";

export default () => {
    globalThis.enmity = {
        modules: { ...metro, common: common },
        patcher,
        version: `Fellowship ${plugin.manifest.hash.slice(7)}`
    };

    return () => delete globalThis.enmity;
}