import { React, ReactNative as RN, stylesheet, constants } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { rawColors, semanticColors } from "@vendetta/ui";
import { Search } from "@vendetta/ui/components";
import { logs } from "../lib/logger";

const styles = stylesheet.createThemedStyleSheet({
    log: {
        fontSize: 12,
        fontFamily: constants.Fonts.CODE_SEMIBOLD,
        color: semanticColors.TEXT_NORMAL,
    },
});

export default () => {
    const [search, setSearch] = React.useState("");
    useProxy(logs);

    return (
        <RN.View style={{ flex: 1 }}>
            <Search
                style={{ margin: 10 }}
                onChangeText={(v: string) => setSearch(v)}
                placeholder="Filter"
            />
            <RN.FlatList
                data={logs.filter(log => Object.values(log).some(v => v.toLowerCase().includes(search)))}
                renderItem={({ item: log }) => {
                    const sourceColor = log.type === "info" ? rawColors.BRAND_360 : log.type === "warn" ? rawColors.YELLOW_360 : rawColors.RED_360;
                    return <RN.Text style={styles.log}><RN.Text style={{ color: sourceColor }}>[{log.source}]: </RN.Text>{log.message}</RN.Text>
                }}
                initialNumToRender={50}
            />
        </RN.View>
    )
}