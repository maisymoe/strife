import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { Row } from "../def";

const { FormText } = Forms;

interface MessageProps {
    row: Row,
}

const styles = stylesheet.createThemedStyleSheet({
    body: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
    },
    avatar: {
        height: 48,
        width: 48,
    },
    contentBody: {
        flex: 1,
        flexDirection: "column",
    },
    usernameRow: {
        flex: 1,
        flexDirection: "row"
    }
});

export default function Message({ row }: MessageProps) {
    return (
        <RN.View style={styles.body}>
            <RN.Image style={styles.avatar} source={{ uri: row.message.avatarURL }} />
            <RN.View style={styles.contentBody}>
                <RN.View style={styles.usernameRow}>
                    <FormText>{row.message.username}</FormText>
                </RN.View>
                <RN.View>
                    <FormText>Message content needs parsing...</FormText>
                </RN.View>
            </RN.View>
        </RN.View>
    )
}