import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { Review } from "../def";

interface ReviewRowProps {
    review: Review,
}

const styles = stylesheet.createThemedStyleSheet({
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18,
    },
});

export default function ReviewRow({ review }: ReviewRowProps) {
    return (
        <Forms.FormRow
            label={review.username}
            subLabel={review.comment}
            leading={<RN.Image style={styles.avatar} source={{ uri: review.profile_photo }} />}
        />
    )
}