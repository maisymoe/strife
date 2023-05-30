import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { semanticColors } from "@vendetta/ui";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";

const { FormRow, FormRadio } = Forms;
const styles = stylesheet.createThemedStyleSheet({
    iconContainer: {
        width: 64,
        height: 64,
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: semanticColors.BACKGROUND_SECONDARY,
    },
});

interface IconRowProps {
    title: string;
    icons: string[];
}

export default ({ title, icons }: IconRowProps) => {
    useProxy(storage);

    return (
        <FormRow
            label={title}
            leading={<RN.FlatList
                style={styles.iconContainer}
                data={icons}
                numColumns={2}
                renderItem={({ item }) => <FormRow.Icon source={{ width: 32, height: 32, uri: item }} />}
            />}
            trailing={<FormRadio selected={title === storage.selectedIconPack} />}
            onPress={() => {
                if (title === storage.selectedIconPack) {
                    delete storage.selectedIconPack;
                    showToast(`Default icons selected.`, getAssetIDByName("Check"));
                } else {
                    storage.selectedIconPack = title;
                    showToast(`${title} selected!`, getAssetIDByName("Check"));
                }
            }}
        />
    );
}