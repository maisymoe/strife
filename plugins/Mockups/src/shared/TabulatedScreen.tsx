import { React, ReactNative as RN } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { Tab } from "../def";

const { BadgableTabBar } = findByProps("BadgableTabBar");

interface TabulatedScreenProps {
    tabs: Tab[];
}

export default ({ tabs }: TabulatedScreenProps) => {
    const [activeTab, setActiveTab] = React.useState<Tab>(tabs[0]);

    return (
        <RN.View style={{ flex: 1 }}>
            <RN.View style={{ margin: 10 }}>
                <BadgableTabBar
                    tabs={tabs}
                    activeTab={activeTab.id}
                    onTabSelected={(id: string) => {
                        const tab = tabs.find(t => t.id === id);
                        if (!tab) return;

                        tab.onPress?.(tab.id);
                        tab.render && setActiveTab(tab);
                    }}
                />
            </RN.View>
            <activeTab.render />
        </RN.View>
    )
}