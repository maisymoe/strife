import { findByStoreName } from "@vendetta/metro";
import { ReactNative as RN, Flux, channels } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";

const MessageStore = findByStoreName("MessageStore");

interface ChatProps {
    messages: any[];
}

function Chat({ messages }: ChatProps) {
    if (!messages) return <RN.Text>Fucky wucky - no messages fetched?</RN.Text>;

    return (
        <RN.FlatList
            data={messages}
            renderItem={({ item }) => <Forms.FormText>{item.content || "no content"}</Forms.FormText>}
            keyExtractor={item => item.id}
        />
    )
}

export default Flux.connectStores([MessageStore], () => ({
    messages: MessageStore.getMessages(channels.getChannelId())?._array,
}))(Chat);