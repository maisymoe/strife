import { React, ReactNative as RN, stylesheet, constants } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { rawColors } from "@vendetta/ui";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { addReview } from "../lib/api";
import { useThemedColor } from "../lib/utils";

interface ReviewInputProps {
    userId: string;
    shouldEdit?: boolean;
    refetch: () => void;
}

const styles = stylesheet.createThemedStyleSheet({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    textInput: {
        flex: 1,
        flexGrow: 1,
        fontSize: 16,
        fontFamily: constants.Fonts.DISPLAY_MEDIUM,
    },
    sendButton: {
        flexShrink: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40,
        minWidth: 40,
        borderRadius: 999,
    },
});

const { useThemeContext } = findByProps("useThemeContext");

export default function ReviewInput({ userId, shouldEdit, refetch }: ReviewInputProps) {
    useProxy(storage);
    const [reviewText, setReviewText] = React.useState("");
    const disableTextArea = !storage.authToken;
    const disableButton = !storage.authToken || reviewText.length === 0;

    return (
        <RN.View style={styles.container}>
            <RN.TextInput
                style={{ ...styles.textInput, color: useThemedColor("TEXT_NORMAL") }}
                editable={!disableTextArea}
                placeholder={disableTextArea ? "You must be authenticated to add a review." : `Tap to ${shouldEdit ? "edit your" : "add a"} review`}
                placeholderTextColor={useThemedColor("INPUT_PLACEHOLDER_TEXT")}
                value={reviewText}
                onChangeText={(i: string) => setReviewText(i)}
            />
            <RN.Pressable
                style={{ ...styles.sendButton, backgroundColor: (storage.useThemedSend && useThemeContext().primaryColor) || rawColors.BRAND_500, opacity: disableButton ? 0.25 : 1 }}
                disabled={disableButton}
                onPress={() => {
                    addReview(userId, reviewText).then((res) => {
                        setReviewText("");
                        refetch();
                        showToast(res.message, getAssetIDByName("Check"));
                    }).catch((err: Error) => showToast(err.message, getAssetIDByName("Small")));
                }}
            >
                <RN.Image style={{ tintColor: "#fff" }} source={getAssetIDByName("ic_send")} />
            </RN.Pressable>
        </RN.View>
    )
}