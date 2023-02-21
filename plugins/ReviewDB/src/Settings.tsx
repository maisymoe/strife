import { ReactNative as RN } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { AUTH_URL } from "./lib/constants";

const { FormSection, FormRow, FormInput } = Forms;
const { openDeeplink } = findByProps("openDeeplink");

export default () => {
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <FormSection title="Authentication" titleStyleType="no_border">
                <FormInput
                    value={storage.authToken}
                    onChange={(v: string) => storage.authToken = v}
                    placeholder="dQw4w9WgXcQ"
                    title="TOKEN"
                />
                <FormRow
                    label="Authenticate with ReviewDB"
                    subLabel="This will open the OAuth2 page. Copy the token you are given, and paste it above."
                    leading={<FormRow.Icon source={getAssetIDByName("copy")} />}
                    trailing={FormRow.Arrow}
                    // TODO: Even if the user cancels this, the redirect will open and just display an error. What do?
                    onPress={() => openDeeplink(AUTH_URL)}
                />
            </FormSection>
        </RN.ScrollView>
    )
}