import { React } from "@vendetta/metro/common";
import { findByDisplayName } from "@vendetta/metro";
import { ErrorBoundary } from "@vendetta/ui/components"
import { Review } from "../def";
import { getReviews } from "../lib/api";
import ReviewRow from "./ReviewRow";

const UserProfileSection = findByDisplayName("UserProfileSection");

interface ReviewSectionProps {
    userId: string;
}

export default function ReviewSection({ userId }: ReviewSectionProps) {
    const [reviews, setReviews] = React.useState<Review[]>([]);
    React.useEffect(() => { getReviews(userId).then(i => setReviews(i)) }, []);

    return (
        <ErrorBoundary>
            <UserProfileSection title="Reviews" showContainer>
                {reviews.map(i => <ReviewRow review={i} />)}
            </UserProfileSection>
        </ErrorBoundary>
    )
}