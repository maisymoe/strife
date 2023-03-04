import { React, ReactNative as RN } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getSettings, plugins } from "@vendetta/plugins";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import RadioRow from "./components/RadioRow";

const { FormRow, FormSection, FormSwitchRow, FormDivider } = Forms;

export default () => {
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormSection title="Options" titleStyleType="no_border">
                <FormSwitchRow
                    label="Append to Vendetta section"
                    subLabel="May be incompatible with other client mods."
                    leading={<FormRow.Icon source={getAssetIDByName("ic_edit_24px")} />}
                    value={storage.appendExisting}
                    onValueChange={(v: boolean) => {
                        storage.appendExisting = v;
                    }}
                />
            </FormSection>
            <FormSection title="Plugins">
                {/* TODO: Is FlatList necessary here? It is seemingly cancelled out by ScrollView */}
                <RN.FlatList
                    data={Object.values(plugins).filter(p => getSettings(p.id))}
                    ItemSeparatorComponent={FormDivider}
                    renderItem={({ item: plugin }) => <RadioRow name={plugin.manifest.name} id={plugin.id} />}
                />
            </FormSection>
        </RN.ScrollView>
    )
}