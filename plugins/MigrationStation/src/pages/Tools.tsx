import { React, ReactNative as RN } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { Forms } from "@vendetta/ui/components";

const { FormRow } = Forms;

export default () => {
    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormRow 
                label="Prox-ify plugins"
                subLabel="This will move any installed plugins that are on the plugin proxy to their proxied versions."
                leading={<FormRow.Icon source={getAssetIDByName("ic_globe_24px")} />}
                onPress={() => showToast("Soon™")}
            />
        </RN.ScrollView>
    )
}