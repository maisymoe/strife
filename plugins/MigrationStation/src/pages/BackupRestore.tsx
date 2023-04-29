import { React, ReactNative as RN } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { Forms } from "@vendetta/ui/components";
import { OptionSwitch } from "../def";
import { openFilePicker } from "../lib/files";
import backup from "../lib/backup";
import restore from "../lib/restore";

const { FormRow, FormSwitchRow, FormSection, FormDivider } = Forms;

const switches: OptionSwitch[] = [
    {
        label: "Vendetta",
        subLabel: "Whether to include Vendetta's settings",
        icon: "settings",
        setting: "includeVendetta",
    },
    {
        label: "Plugins",
        subLabel: "Whether to include installed plugins",
        icon: "debug",
        setting: "includePlugins",
    },
    {
        label: "Plugin Data",
        subLabel: "Whether to include the data of installed plugins",
        icon: "ic_rulebook",
        setting: "includePluginData",
        depends: "includePlugins",
    },
    {
        label: "Themes",
        subLabel: "Whether to include installed themes",
        icon: "ic_theme_24px",
        setting: "includeThemes",
    },
]

export default () => {
    const [, forceUpdate] = React.useReducer((n) => ~n, 0);
    useProxy(storage);

    const anyAvailable = Object.values(storage).every(i => !i);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            {switches.map((p, i) => (
                <>
                    <FormSwitchRow 
                        label={p.label}
                        subLabel={p.subLabel}
                        leading={p.icon && <FormRow.Icon source={getAssetIDByName(p.icon)} />}
                        disabled={storage[p.depends] === false}
                        value={storage[p.setting]}
                        onValueChange={(v: boolean) => {
                            p.action?.(v);
                            storage[p.setting] = v;
                            if (v === false) {
                                switches
                                    .filter(i => i.depends === p.setting)
                                    .forEach(i => storage[i.setting] = false);
                                // useProxy doesn't like it when lots of settings update at once, so force re-render
                                forceUpdate();
                            }
                        }}
                    />
                    {i !== switches.length - 1 && <FormDivider />}
                </>
            ))}
            <FormSection title="Actions">
                <FormRow 
                    label="Backup"
                    leading={<FormRow.Icon source={getAssetIDByName("share")} />}
                    disabled={anyAvailable}
                    onPress={async () => {
                        const finalBackup = await backup({
                            vendetta: storage.includeVendetta,
                            plugins: storage.includePlugins,
                            pluginData: storage.includePluginData,
                            themes: storage.includeThemes,
                        }).catch(e => showToast("Failed to create backup", getAssetIDByName("Small")));

                        RN.Share.share({ message: JSON.stringify(finalBackup), title: `vd-ms-backup-${Date.now()}` });
                    }}
                />
                <FormRow 
                    label="Restore"
                    leading={<FormRow.Icon source={getAssetIDByName("ic_download_24px")} />}
                    disabled={anyAvailable}
                    onPress={() => openFilePicker().then(async i => {
                        await restore(i, {
                            vendetta: storage.includeVendetta,
                            plugins: storage.includePlugins,
                            pluginData: storage.includePluginData,
                            themes: storage.includeThemes,
                        });

                        showToast("Restored backup successfully.", getAssetIDByName("Check"));
                    }).catch(e => showToast(e, getAssetIDByName("Small")))}
                />
            </FormSection>
        </RN.ScrollView>
    )
}