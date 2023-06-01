import { plugin } from "@vendetta";
import { General, Forms } from "@vendetta/ui/components";
import * as metro from "../api/metro";
import * as common from "../api/metro/common";
import * as patcher from "../api/patcher";
import * as plugins from "../api/plugins";
import * as clyde from "../api/clyde";
import * as commands from "../api/commands";
import * as utilities from "../api/utilities";
import * as native from "../api/native";
import * as assets from "../api/assets";

export default () => {
    globalThis.enmity = {
        modules: { ...metro, common: common },
        patcher,
        version: `Fellowship ${plugin.manifest.hash.slice(7)}`,
        plugins,
        clyde,
        commands,
        utilities,
        components: new Proxy({}, { get: (_, prop) => General[prop] ?? Forms[prop] }),
        native,
        assets,
    };

    return () => delete globalThis.enmity;
}