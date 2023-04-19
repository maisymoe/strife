import { ReactNative as RN } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { Badge } from "../def";

interface ReviewBadgeProps {
    badge: Badge;
}

export default function ReviewBadge({ badge }: ReviewBadgeProps) {
    return (
        <RN.Pressable
            style={{ marginLeft: 4 }}
            onPress={() => {
                // @ts-expect-error this is a vendetta-types moment
                showToast(badge.name, { uri: badge.icon });
            }}
        >
            <RN.Image source={{ uri: badge.icon, width: 16, height: 16 }} />
        </RN.Pressable>
    )
}