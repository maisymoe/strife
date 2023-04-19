import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { Forms } from "@vendetta/ui/components";
import { Review } from "../def";
import showReviewActionSheet from "../lib/showReviewActionSheet";

interface ReviewRowProps {
    review: Review;
}

const styles = stylesheet.createThemedStyleSheet({
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18,
    },
});

const { FormRow, FormLabel, FormSubLabel } = Forms;
const { colors, meta } = findByProps("colors", "meta");
const { useThemeContext } = findByProps("useThemeContext");

// This component behaves VERY similarly to this custom one, but subLabel doesn't get themed so... here we are!
// const UserProfileRow = findByName("UserProfileRow");

export default function ReviewRow({ review }: ReviewRowProps) {
    const themeContext = useThemeContext();
    const labelColor = meta.resolveSemanticColor(themeContext.theme, colors.TEXT_NORMAL);

    return (
        <FormRow
            label={<FormLabel text={review.sender.username} style={{ color: labelColor }} />}
            subLabel={<FormSubLabel text={review.comment} style={{ color: labelColor }} />}
            leading={<RN.Image style={styles.avatar} source={{ uri: review.sender.profilePhoto }} />}
            onLongPress={() => showReviewActionSheet(review)}
        />
    )
}