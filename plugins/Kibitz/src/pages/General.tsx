import { ReactNative as RN, NavigationNative } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import Dispatches from "./Dispatches";

const { FormSection, FormDivider, FormRow, FormSwitchRow } = Forms;

export default function General() {
    const navigation = NavigationNative.useNavigation();
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormSection title="Flux" titleStyleType="no_border">
                <FormSwitchRow
                    label="Log all dispatches"
                    subLabel="Disabled by default due to performance concerns."
                    leading={<FormRow.Icon source={getAssetIDByName(storage.flux.logger.enabled ? "ic_noise_cancellation_active" : "ic_noise_cancellation_disabled")} />}
                    value={storage.flux.logger.enabled}
                    onValueChange={(v: boolean) => {
                        storage.flux.logger.enabled = v;
                    }}
                />
                <FormDivider />
                <FormRow
                    label="Open logs"
                    leading={<FormRow.Icon source={getAssetIDByName("ic_rich_presence_dark_12px")} />}
                    trailing={FormRow.Arrow}
                    onPress={() => navigation.push("VendettaCustomPage", {
                        title: "Dispatches",
                        render: Dispatches,
                    })}
                />
            </FormSection>
        </RN.ScrollView>
    )
}