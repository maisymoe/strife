import { ReactNative as RN } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import { Switch } from "./def";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { setBugReporterState } from "./patches/patchBugReporter";

const { FormRow, FormSwitchRow, FormDivider } = Forms;

const switches: Switch[] = [
    {
        label: "Force disable Bug Reporter",
        subLabel: "Prevent enabling Discord's Bug Reporter, since the value of built-in toggle does not persist.",
        icon: "ic_badge_bug_hunter_level_1",
        setting: "disableBugReporter",
        action: () => setBugReporterState(false),
    }
]

export default () => {
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            {switches.map((p, i) => (
                <>
                    <FormSwitchRow 
                        label={p.label}
                        subLabel={p.subLabel}
                        leading={p.icon && <FormRow.Icon source={getAssetIDByName(p.icon)} />}
                        value={storage[p.setting]}
                        onValueChange={(v: boolean) => {
                            p.action?.(v);
                            storage[p.setting] = v;
                        }}
                    />
                    {i !== switches.length - 1 && <FormDivider />}
                </>
            ))} 
        </RN.ScrollView>
    )
}