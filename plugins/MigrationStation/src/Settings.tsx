import { React, ReactNative as RN, NavigationNative } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { Tab } from "./def";
import HeaderButton from "./components/HeaderButton";
import BackupRestore from "./pages/BackupRestore";
import Tools from "./pages/Tools";
import Debug from "./pages/Debug";

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
    },
]

export default () => {
    const navigation = NavigationNative.useNavigation();
    const [activeTab, setActiveTab] = React.useState<Tab>(tabs[0]);

    navigation.setOptions({
        headerRight: () => <HeaderButton 
            asset="debug"
            onPress={() => navigation.push("VendettaCustomPage", { title: "MigrationStation Logs", render: Debug })}
        />
    })

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