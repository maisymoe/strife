import { React, ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { rawColors } from "@vendetta/ui";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { addReview } from "../lib/api";

// TODO: This component isn't styled very well.
// TODO: Properly handle existing reviews - whilst it does work fine right now, add a visual representation

interface ReviewInputProps {
    userId: string,
    refetch: () => void,
}

const styles = stylesheet.createThemedStyleSheet({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
        marginHorizontal: 8,
    },
    textInput: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 0,
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

export default function ReviewInput({ userId, refetch }: ReviewInputProps) {
    useProxy(storage);
    const [reviewText, setReviewText] = React.useState("");
    const disableTextArea = !storage.authToken;
    const disableButton = !storage.authToken || reviewText.length === 0;

    return (
        <RN.View style={styles.container}>
            <Forms.FormInput
                style={styles.textInput}
                editable={!disableTextArea}
                placeholder={disableTextArea ? "You must be authorised to add a review." : "Tap to add a review"}
                showBorder={false}
                value={reviewText}
                onChange={(i: string) => setReviewText(i)}
            />
            <RN.Pressable 
                style={{ ...styles.sendButton, opacity: disableButton ? 0.25 : 1 }}
                // disabled={disableButton}
                onPress={() => {
                    console.log("pressed");
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