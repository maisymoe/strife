import { React, ReactNative as RN } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";

const { FormText } = Forms;

interface Props {
    guildId: string;
}

export default ({ guildId }: Props) => (
    <RN.View style={{ flex: 1 }}>
        <FormText>Safety Setup</FormText>
        <FormText>We're in {guildId}</FormText>
    </RN.View>
)
