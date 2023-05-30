import { React, ReactNative as RN } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";

const { TableRow } = findByProps("TableRow");

export default function Summary({ label, icon, noPadding = false, noAnimation = false, children }: SummaryProps) {
    const [hidden, setHidden] = React.useState(true);

    return (
        <>
            <TableRow
                label={label}
                icon={icon && <TableRow.Icon source={getAssetIDByName(icon)} />}
                trailing={<TableRow.Arrow style={{ transform: [{ rotate: `${hidden ? 180 : 90}deg` }] }} />}
                onPress={() => {
                    setHidden(!hidden);
                    if (!noAnimation) RN.LayoutAnimation.configureNext(RN.LayoutAnimation.Presets.easeInEaseOut);
                }}
            />
            {!hidden && <RN.View style={!noPadding && { paddingHorizontal: 15 }}>{children}</RN.View>}
        </>
    )
}