import * as metro from "./api/metro";
import * as common from "./api/metro/common";
import * as patcher from "./api/patcher";
import * as native from "./api/native";
import * as assets from "./api/assets";
import { plugin } from "@vendetta";

export default () => {
    globalThis.enmity = {
        modules: { ...metro, common: common },
        patcher,
        version: `Fellowship ${plugin.manifest.hash.slice(7)}`,
        native,
        assets,
    };

    return () => delete globalThis.enmity;
}