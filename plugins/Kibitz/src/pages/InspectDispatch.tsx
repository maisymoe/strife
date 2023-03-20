import { ReactNative as RN, clipboard, constants } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms, Summary } from "@vendetta/ui/components";
import { Dispatch } from "../def";
import { highlightJson } from "../highlight";

interface InspectDispatchProps {
    dispatch: Dispatch;
}

const { FormRow, FormDivider, FormText } = Forms;

export default function InspectDispatch({ dispatch }: InspectDispatchProps) {
    const dataString = JSON.stringify(dispatch.data, null, 4);
    const dataText = highlightJson(dataString);

    return (
        <RN.ScrollView style={{ flex: 1 }}>
            <FormRow
                label={dispatch.data.type}
                leading={<FormRow.Icon source={getAssetIDByName("ic_info_24px")} />}
            />
            <FormDivider />
            <FormRow
                label={dispatch.time}
                leading={<FormRow.Icon source={getAssetIDByName("ic_timer_24px")} />}
            />
            <FormDivider />
            <Summary label="Data" icon="ic_channels_24px">
                <RN.TouchableOpacity
                    onLongPress={() => {
                        clipboard.setString(dataString);
                        showToast("Copied dispatch data to clipboard.", getAssetIDByName("toast_copy_link"));
                    }}
                >
                    <FormText style={{ fontFamily: constants.Fonts.CODE_SEMIBOLD, fontSize: 12 }}>
                        {dataText}
                    </FormText>
                </RN.TouchableOpacity>
            </Summary>
        </RN.ScrollView>
    )
}