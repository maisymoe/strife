import { React, ReactNative as RN, NavigationNative } from "@vendetta/metro/common";
import { findByName } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import { Page } from "./def";
import TabulatedScreen from "./shared/TabulatedScreen";
import Icons from "./pages/themes/Icons";
import Fonts from "./pages/themes/Fonts";
import TableRowGeneral from "./pages/tablerow-general";

const { FormRow, FormDivider } = Forms;
const getScreens = findByName("getScreens");

const pages: Page[] = [
    {
        label: "new themes",
        icon: "ic_theme_24px",
        render: () => <TabulatedScreen tabs={[
            {
                id: "colors",
                title: "Colors",
                // cursed
                render: getScreens({})?.VendettaThemes?.render,
            },
            {
                id: "icons",
                title: "Icons",
                render: Icons,
            },
            {
                id: "fonts",
                title: "Fonts",
                render: Fonts,
            },
        ]} />
    },
    {
        label: "the tabs ui-ening",
        icon: "ic_reaction_burst",
        render: TableRowGeneral,
    }
]

export const settings = () => {
    const navigation = NavigationNative.useNavigation();

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            {pages.map((p, i) => (
                <>
                    <FormRow 
                        label={p.label}
                        subLabel={p.description}
                        leading={<FormRow.Icon source={getAssetIDByName(p.icon)} />}
                        trailing={FormRow.Arrow}
                        onPress={() => navigation.push("VendettaCustomPage", {
                            title: p.label,
                            render: p.render,
                        })}
                    />
                    {i !== pages.length - 1 && <FormDivider />}
                </>
            ))}
        </RN.ScrollView>
    )
}