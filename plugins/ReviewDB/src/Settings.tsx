import { ReactNative as RN } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import showAuthModal from "./lib/showAuthModal";

const { FormSection, FormRow, FormSwitchRow, FormDivider } = Forms;

export default () => {
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormSection title="Authentication" titleStyleType="no_border">
                <FormRow
                    label="Authenticate with ReviewDB"
                    leading={<FormRow.Icon source={getAssetIDByName("copy")} />}
                    trailing={FormRow.Arrow}
                    onPress={showAuthModal}
                />
                <FormDivider />
                <FormRow
                    label="Log out of ReviewDB"
                    subLabel="Note that this does not remove ReviewDB from your Authorized Apps page in Discord."
                    leading={<FormRow.Icon source={getAssetIDByName("ic_logout_24px")} />}
                    disabled={storage.authToken.length === 0}
                    onPress={() => storage.authToken = ""}
                />
            </FormSection>
            <FormSection title="Settings">
                <FormSwitchRow
                    label="Use profile-themed send button"
                    subLabel="Controls whether the review send button should attempt to match the user's profile colors."
                    leading={<FormRow.Icon source={getAssetIDByName("ic_paint_brush")} />}
                    value={storage.useThemedSend}
                    onValueChange={(v: boolean) => storage.useThemedSend = v}
                />
            </FormSection>
        </RN.ScrollView>
    )
}