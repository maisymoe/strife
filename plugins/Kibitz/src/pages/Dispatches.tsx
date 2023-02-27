import { ReactNative as RN, NavigationNative } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { WUNGUS_URL } from "../constants";
import { dispatches } from "../patches/dispatchLogger";
import DispatchRow from "../components/DispatchRow";

const { FormDivider, FormText } = Forms;

// TODO: Move to stylesheet

export default function DispatchLogs() {
    const navigation = NavigationNative.useNavigation();
    useProxy(dispatches);
    useProxy(storage);

    const shouldWungus = Math.random() <= 0.1;

    if (dispatches.length !== 0) {
        return (
            <RN.View style={{ flex: 1 }}>
                <RN.FlatList
                    data={Object.values(dispatches)}
                    renderItem={({ item }) => <DispatchRow dispatch={item} navigation={navigation} />}
                    ItemSeparatorComponent={FormDivider}
                />
            </RN.View>
        )
    } else {
        return (
            <RN.View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <RN.Image source={shouldWungus ? { uri: WUNGUS_URL } : getAssetIDByName("empty_blocked_users")} style={{ width: 256, height: 128, resizeMode: "contain" }} />
                <FormText style={{ textAlign: "center" }}>There are no dispatches. Here's {shouldWungus ? "Wungus" : "Wumpus"} for now.</FormText>
            </RN.View>
        )
    }
}