import { React, ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { semanticColors } from "@vendetta/ui";

const styles = stylesheet.createThemedStyleSheet({
    icon: {
        marginRight: 10,
        tintColor: semanticColors.HEADER_PRIMARY,
    }
});

interface HeaderButtonProps {
    asset: string;
    onPress?: () => void;
}

export default ({ asset, onPress }: HeaderButtonProps) => (
    <RN.TouchableOpacity onPress={onPress}>
        <RN.Image style={styles.icon} source={getAssetIDByName(asset)} />
    </RN.TouchableOpacity>
)