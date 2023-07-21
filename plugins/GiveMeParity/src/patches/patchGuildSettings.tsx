import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import SafetySetup from "../components/GuildSettingsModal/SafetySetup";

const { FormDivider, FormRow } = Forms;
const gsmScreens = findByName("GuildSettingsModal", false);
const Landing = findByName("GuildSettingsModalLanding", false);

export default function patchGuildSettings() {
    const patches = new Array<Function>;

    patches.push(after("default", gsmScreens, (_, ret) => {
        ret.props.screens = {
            ...ret.props.screens,
            SAFETY_SETUP: {
                title: "Safety Setup",
                render: SafetySetup,
            }
        }
    }));

    patches.push(after("default", Landing, (_, ret) => {
        // One-time patch the inner
        after("type", ret, (_, ret) => {
            const SettingsSection = findInReactTree(ret?.props, (i) => i.type?.name === "SettingsSection");
            if (!SettingsSection?.props?.canManageGuild) return;

            after("type", SettingsSection, (args, ret) => {
                const { guild, pushScreen } = args?.[0];
                console.log(guild, pushScreen);

                const modIndex = ret?.props?.children?.findIndex(row => row?.key === "moderation");
                ret?.props?.children?.splice(modIndex + 1, 0, (
                    <>
                        <FormDivider />
                        <FormRow
                            leading={<FormRow.Icon source={getAssetIDByName("ic_robot_24px")} />}
                            label="Safety Setup"
                            onPress={() => pushScreen("SAFETY_SETUP", { guildId: guild.id })}
                        />
                    </>
                ))
            }, true);
        }, true);
    }));

    return () => patches.forEach(p => p());
}
