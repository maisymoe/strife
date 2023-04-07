import { React, ReactNative as RN, NavigationNative } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showInputAlert } from "@vendetta/ui/alerts";
import { showToast } from "@vendetta/ui/toasts";
import { Forms } from "@vendetta/ui/components";
import { OptionSwitch } from "../def";
import backup from "../lib/backup";
import restore from "../lib/restore";
import { downloadFile, openFilePicker } from "../lib/files";
import Summary from "./Summary";

const { FormRow, FormSwitchRow, FormSection, FormDivider } = Forms;

const switches: OptionSwitch[] = [
    {
        label: "Vendetta",
        subLabel: "Whether to backup Vendetta's settings",
        icon: "settings",
        setting: "backupVendetta",
    },
    {
        label: "Plugins",
        subLabel: "Whether to backup installed plugins",
        icon: "debug",
        setting: "backupPlugins",
    },
    {
        label: "Plugin Data",
        subLabel: "Whether to backup the data of installed plugins",
        icon: "ic_rulebook",
        setting: "backupPluginData",
        depends: "backupPlugins",
    },
    {
        label: "Themes",
        subLabel: "Whether to backup installed themes",
        icon: "ic_theme_24px",
        setting: "backupThemes",
    },
]

export default () => {
    const [, forceUpdate] = React.useReducer((n) => ~n, 0);
    const navigation = NavigationNative.useNavigation();
    useProxy(storage);

    const anyAvailable = Object.values(storage).every(i => !i);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormSection title="Options" titleStyleType="no_border">
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
            </FormSection>
            <FormSection title="Actions">
                <FormRow 
                    label="Backup"
                    leading={<FormRow.Icon source={getAssetIDByName("share")} />}
                    disabled={anyAvailable}
                    onPress={async () => {
                        const finalBackup = await backup({
                            vendetta: storage.backupVendetta,
                            plugins: storage.backupPlugins,
                            pluginData: storage.backupPluginData,
                            themes: storage.backupThemes,
                        }).catch(e => showToast("Failed to create backup", getAssetIDByName("Small")));

                        RN.Share.share({ message: JSON.stringify(finalBackup, null, 4), title: `vd-ms-backup-${Date.now()}` });
                    }}
                />
                <FormRow 
                    label="Restore"
                    leading={<FormRow.Icon source={getAssetIDByName("ic_download_24px")} />}
                    disabled={anyAvailable}
                    onPress={() => openFilePicker().then(async i => {
                        await restore(i, {
                            vendetta: storage.backupVendetta,
                            plugins: storage.backupPlugins,
                            pluginData: storage.backupPluginData,
                            themes: storage.backupThemes,
                        });

                        showToast("Restored backup successfully.", getAssetIDByName("Check"));
                    }).catch(e => showToast(e, getAssetIDByName("Small")))}
                />
                <FormRow 
                    label="Tools"
                    leading={<FormRow.Icon source={getAssetIDByName("ic_badge_staff")} />}
                    trailing={<FormRow.Arrow />}
                    onPress={() => showToast("TODO", getAssetIDByName("img_none"))}
                />
                <FormRow 
                    label="TESTING: Show Summary Page"
                    leading={<FormRow.Icon source={getAssetIDByName("settings")} />}
                    trailing={<FormRow.Arrow />}
                    onPress={() => navigation.push("VendettaCustomPage", {
                        title: "Summary",
                        render: () => <Summary 
                            headerText="Backup Success"
                            bodyText="All done!"
                            buttons={[
                                {
                                    text: "Reload",
                                    onPress: () => RN.NativeModules.BundleUpdaterManager.reload(),
                                }
                            ]}
                        />,
                    })}
                />
            </FormSection>
        </RN.ScrollView>
    )
}