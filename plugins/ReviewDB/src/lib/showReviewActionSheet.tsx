import { ReactNative as RN, clipboard, stylesheet } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { showConfirmationAlert } from "@vendetta/ui/alerts";
import { Review } from "../def";
import { deleteReview, reportReview } from "./api";
import { canDeleteReview } from "./utils";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";

const styles = stylesheet.createThemedStyleSheet({
    icon: {
        height: 16,
        width: 16,
        borderRadius: 8,
    },
});

const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");

export const showReviewActionSheet = (review: Review) => showSimpleActionSheet({
    key: "ReviewOverflow",
    header: {
        title: `Review by ${review.username}`,
        // TODO: Return to the user profile
        onClose: () => hideActionSheet(),
    },
    options: [
        {
            label: "Copy Text",
            onPress: () => {
                clipboard.setString(review.comment);
                showToast("Copied Review Text", getAssetIDByName("ic_message_copy"));
            }
        },
        ...(storage.authToken ? [
            ...(canDeleteReview(review) ? [{
                label: "Delete Review",
                isDestructive: true,
                onPress: () => showConfirmationAlert({
                    title: "Delete Review",
                    content: "Are you sure you want to delete this review?",
                    confirmText: "Yes",
                    cancelText: "No",
                    // @ts-ignore
                    confirmColor: "red",
                    onConfirm: () => deleteReview(review.id),
                })
            }] : []),
            {
                label: "Report Review",
                isDestructive: true,
                onPress: () => showConfirmationAlert({
                    title: "Report Review",
                    content: "Are you sure you want to report this review?",
                    confirmText: "Yes",
                    cancelText: "No",
                    // @ts-ignore
                    confirmColor: "red",
                    onConfirm: () => reportReview(review.id),
                })
            }
        ]: [])
    ]
})