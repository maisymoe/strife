import { i18n } from "@vendetta/metro/common";
import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import { Forms } from "@vendetta/ui/components";
import SettingsSection from "../components/SettingsSection";

const settingsModule = findByName("UserSettingsOverviewWrapper", false);

export default function patchSettings() {
    const patches = new Array<Function>;

    const unpatch = after("default", settingsModule, (_, ret) => {
        const Overview = findInReactTree(ret.props.children, i => i.type && i.type.name === "UserSettingsOverview");

        patches.push(after("render", Overview.type.prototype, (_, { props: { children } }) => {
            const titles = [i18n.Messages["BILLING_SETTINGS"], i18n.Messages["PREMIUM_SETTINGS"]];
            children = findInReactTree(children, (tree) => tree.children[1].type === Forms.FormSection).children;
            const index = children.findIndex((c: any) => titles.includes(c?.props.label));
            children.splice(index === -1 ? 4 : index, 0, <SettingsSection />);
        }));

        // TODO: One-time patching isn't working here???
        unpatch();
    });

    return () => patches.forEach(p => p());
}