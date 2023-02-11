import { ReactNative as RN, constants, stylesheet } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { state } from "../patches/interceptor";
import Error from "./Error";
import Message from "./Message";

const styles = stylesheet.createThemedStyleSheet({
    body: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: constants.ThemeColorMap.CHAT_BACKGROUND,
        height: "100%",
    }
});

// TODO: Chat lays out in wrong order
export default function Chat() {
    useProxy(state);

    if (state.rows.length === 0) return <Error error="Rows empty" />

    return (
        <RN.View style={styles.body}>
            <RN.FlatList
                inverted
                data={state.rows}
                renderItem={({ item }) => {
                    if (item.type === 1) return <Message row={item} />
                    else return <Error error={`Unhandled message type ${item.type}`} />
                }}
                keyExtractor={item => item.index.toString()}
            />
        </RN.View>
    )
}