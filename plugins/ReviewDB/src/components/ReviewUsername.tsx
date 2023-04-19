import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { Forms } from "@vendetta/ui/components";
import { Badge } from "../def";
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
const { colors, meta } = findByProps("colors", "meta");
const { useThemeContext } = findByProps("useThemeContext");

export default function ReviewUsername({ username, badges }: ReviewUsernameProps) {
    const themeContext = useThemeContext();
    const labelColor = meta.resolveSemanticColor(themeContext.theme, colors.TEXT_NORMAL);

    return (
        <RN.View style={styles.row}>
            <FormLabel text={username} style={{ color: labelColor }} />
            <RN.View style={styles.row}>{badges.map(b => <ReviewBadge badge={b} />)}</RN.View>
        </RN.View>
    )
}