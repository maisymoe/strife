import { React, ReactNative as RN, stylesheet, constants } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { rawColors } from "@vendetta/ui";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { addReview } from "../lib/api";

// TODO: Properly handle existing reviews - whilst it does work fine right now, add a visual representation

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
        marginHorizontal: 4,
    },
    textInput: {
        flex: 1,
        flexGrow: 1,
        fontSize: 16,
        fontFamily: constants.Fonts.DISPLAY_MEDIUM,
    },
    sendButton: {
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: rawColors.BRAND_500,
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 4,
    },
});

const { colors, meta } = findByProps("colors", "meta");
const useThemeContext = findByProps("useThemeContext").useThemeContext;

export default function ReviewInput({ userId, shouldEdit, refetch }: ReviewInputProps) {
    useProxy(storage);
    const themeContext = useThemeContext();
    const textColor = meta.resolveSemanticColor(themeContext.theme, colors.TEXT_NORMAL);
    const placeholderColor = meta.resolveSemanticColor(themeContext.theme, colors.INPUT_PLACEHOLDER_TEXT);

    const [reviewText, setReviewText] = React.useState("");
    const disableTextArea = !storage.authToken;
    const disableButton = !storage.authToken || reviewText.length === 0;

    return (
        <RN.View style={styles.container}>
            <RN.TextInput
                style={{ ...styles.textInput, color: textColor }}
                editable={!disableTextArea}
                placeholder={disableTextArea ? "You must be authorised to add a review." : `Tap to ${shouldEdit ? "edit your" : "add a"} review`}
                placeholderTextColor={placeholderColor}
                value={reviewText}
                onChangeText={(i: string) => setReviewText(i)}
            />
            <RN.Pressable
                style={{ ...styles.sendButton, opacity: disableButton ? 0.25 : 1 }}
                disabled={disableButton}
                onPress={() => {
                    addReview(userId, reviewText).then((res) => {
                        setReviewText("");
                        refetch();
                        showToast(res, getAssetIDByName("Check"));
                    }).catch((err) => showToast(err, getAssetIDByName("Small")));
                }}
            >
                <RN.Image style={{ tintColor: "#fff" }} source={getAssetIDByName("ic_send")} />
            </RN.Pressable>
        </RN.View>
    )
}