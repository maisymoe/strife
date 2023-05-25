import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { Badge } from "../def";
import { useThemedColor } from "../lib/utils";
import ReviewBadge from "./ReviewBadge";

interface ReviewUsernameProps {
    username: string;
    badges: Badge[];
}

const styles = stylesheet.createThemedStyleSheet({
    row: {
        flexDirection: "row",
        alignItems: "center",
    }
})

const { FormLabel } = Forms;

export default ({ username, badges }: ReviewUsernameProps) => (
    <RN.View style={styles.row}>
        <FormLabel text={username} style={{ color: useThemedColor("TEXT_NORMAL") }} />
        <RN.View style={styles.row}>{badges.map(b => <ReviewBadge badge={b} />)}</RN.View>
    </RN.View>
)