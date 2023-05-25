import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { Review } from "../def";
import { useThemedColor } from "../lib/utils";
import showReviewActionSheet from "../lib/showReviewActionSheet";
import ReviewUsername from "./ReviewUsername";

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

const { FormRow, FormSubLabel } = Forms;

// This component behaves VERY similarly to this custom one, but subLabel doesn't get themed so... here we are!
// const UserProfileRow = findByName("UserProfileRow");

export default ({ review }: ReviewRowProps) => (
    <FormRow
        label={<ReviewUsername username={review.sender.username} badges={review.sender.badges} />}
        subLabel={<FormSubLabel text={review.comment} style={{ color: useThemedColor("TEXT_NORMAL") }} />}
        leading={<RN.Image style={styles.avatar} source={{ uri: review.sender.profilePhoto }} />}
        onLongPress={() => showReviewActionSheet(review)}
    />
)