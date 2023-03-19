import { React } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { plugins } from "@vendetta/plugins";
import { ErrorBoundary, Forms } from "@vendetta/ui/components";
import SettingsRow from "./SettingsRow";

const { FormSection, FormDivider } = Forms;

export default function SettingsSection() {
    useProxy(storage);
    const keyedPlugins = Object.keys(storage.pinnedPlugins);
    const hasOtherMods = window.hasOwnProperty("enmity") || window.hasOwnProperty("Aliucord");

    const [, forceUpdate] = React.useReducer((n) => ~n, 0);

    if (keyedPlugins.length === 0) return null;

    const mappedRows = keyedPlugins.filter(p => plugins[p] && plugins[p].enabled).map((p, i) => (
        <>
            <SettingsRow plugin={plugins[p]} forceUpdate={forceUpdate} />
            {i !== keyedPlugins.length - 1 && <FormDivider />}
        </>
    ))

    if (storage.appendExisting) {
        return <ErrorBoundary>{mappedRows}</ErrorBoundary>;
    } else {
        return (
            <ErrorBoundary>
                <FormSection key="PinSettingsPlugins" title={`${hasOtherMods ? "Vendetta " : ""}Plugins`}>
                    {mappedRows}
                </FormSection>
            </ErrorBoundary>
        )
    }
}