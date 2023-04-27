import { findByProps } from "@vendetta/metro";
import { React, ReactNative as RN } from "@vendetta/metro/common";
import { Tab } from "./def";
import BackupRestore from "./pages/BackupRestore";
import Tools from "./pages/Tools";

const { BadgableTabBar } = findByProps("BadgableTabBar");

const tabs: Tab[] = [
    {
        id: "backup_restore",
        title: "Backup and Restore",
        render: BackupRestore,
    },
    {
        id: "tools",
        title: "Tools",
        render: Tools,
    }
]

export default () => {
    const [activeTab, setActiveTab] = React.useState<Tab>(tabs[0]);

    return (
        <RN.View style={{ flex: 1 }}>
            <RN.View style={{ margin: 16 }}>
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