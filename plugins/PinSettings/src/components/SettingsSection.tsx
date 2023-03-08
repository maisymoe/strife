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

    if (keyedPlugins.length === 0) return null;

    const mappedRows = keyedPlugins.map((p, i) => (
        <>
            <SettingsRow plugin={plugins[p]} />
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