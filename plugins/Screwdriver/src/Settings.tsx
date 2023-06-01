import { ReactNative as RN } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms, HelpMessage } from "@vendetta/ui/components";
import { Category } from "./def";
import { setBugReporterState } from "./patches/patchBugReporter";

const { FormSection, FormRow, FormSwitchRow, FormDivider } = Forms;

const categories: Category[] = [
    {
        title: "Quality of Life",
        items: [
            {
                label: "Forcibly disable Bug Reporter",
                subLabel: "Prevent enabling Discord's Bug Reporter, since the value of built-in toggle does not persist.",
                icon: "ic_noise_cancellation_disabled",
                setting: "disableBugReporter",
                action: () => setBugReporterState(false),
            }
        ]
    },
    {
        title: "Fixes",
        items: [
            {
                label: "JSON file uploads",
                subLabel: "Fix a long-standing Discord bug causing JSON files to be uploaded with their metadata as contents.",
                icon: "ic_file_upload_24px",
                setting: "fixJSONUploads",
            }
        ]
    },
    {
        title: "Forbidden Fruit",
        disclaimer: "These features grant certain Nitro perks without Nitro, take caution when using them.",
        items: [
            {
                label: "Enable Client Themes",
                subLabel: "Forcibly enable Discord's themes, regardless of if you have Nitro.",
                icon: "ic_theme_24px",
                setting: "enableClientThemes",
            }
        ]
    },
]

export default () => {
    useProxy(storage);

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            {/* This probably isn't efficient */}
            {categories.map((category, index) => (
                <FormSection title={category.title} titleStyleType={index === 0 ? "no_border" : undefined}>
                    {/* @ts-expect-error vendetta-types moment, props can't be passed to HelpMessage here */}
                    {category.disclaimer && <RN.View style={{ marginHorizontal: 10, marginBottom: 10 }}><HelpMessage messageType={0}>{category.disclaimer}</HelpMessage></RN.View>}
                    {category.items.map((item, index) => (
                        <>
                            <FormSwitchRow 
                                label={item.label}
                                subLabel={item.subLabel}
                                leading={item.icon && <FormRow.Icon source={getAssetIDByName(item.icon)} />}
                                disabled={item.disabled}
                                value={storage[item.setting]}
                                onValueChange={(v: boolean) => {
                                    item.action?.(v);
                                    storage[item.setting] = v;
                                }}
                            />
                            {index !== category.items.length - 1 && <FormDivider />}
                        </>
                    ))}
                </FormSection>
            ))} 
        </RN.ScrollView>
    )
}