import { React, ReactNative as RN } from "@vendetta/metro/common";
import { findByDisplayName } from "@vendetta/metro";
import { ErrorBoundary } from "@vendetta/ui/components"
import { Review } from "../def";
import { getReviews } from "../lib/api";
import ReviewRow from "./ReviewRow";
import ReviewInput from "./ReviewInput";

const UserProfileSection = findByDisplayName("UserProfileSection");

interface ReviewSectionProps {
    userId: string;
}

export default function ReviewSection({ userId }: ReviewSectionProps) {
    const [reviews, setReviews] = React.useState<Review[]>([]);

    const fetchReviews = () => { getReviews(userId).then(i => setReviews(i)) };
    React.useEffect(fetchReviews, []);

    return (
        <ErrorBoundary>
            <UserProfileSection title="Reviews" showContainer>
                <RN.View style={{ flex: 1 }}>
                    {reviews.map(i => <ReviewRow review={i} />)}
                </RN.View>
                <ReviewInput userId={userId} refetch={fetchReviews} />
            </UserProfileSection>
        </ErrorBoundary>
    )
}