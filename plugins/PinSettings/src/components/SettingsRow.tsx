import { NavigationNative } from "@vendetta/metro/common";
import { getSettings } from "@vendetta/plugins";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";

interface SettingsRowProps {
    // TODO: Oh god, TS is using the old browser Plugin interface here
    plugin: Plugin;
}

const { FormRow } = Forms;

export default function SettingsRow({ plugin }: SettingsRowProps) {
    const settings = getSettings(plugin.id)
    const navigation = NavigationNative.useNavigation();
    
    return (
        <FormRow
            label={plugin.manifest.name}
            leading={<FormRow.Icon source={getAssetIDByName(plugin.manifest.vendetta?.icon ?? "ic_application_command_24px")} />}
            trailing={FormRow.Arrow}
            onPress={() => navigation.push("VendettaCustomPage", {
                title: plugin.manifest.name,
                render: settings,
            })}
        />
    )
}