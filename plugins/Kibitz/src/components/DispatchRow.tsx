import { Forms } from "@vendetta/ui/components";
import { Dispatch } from "../def";
import InspectDispatch from "../pages/InspectDispatch";

interface DispatchRowProps {
    dispatch: Dispatch;
    navigation: any;
}

const { FormRow } = Forms;

export default function DispatchRow({ dispatch, navigation }: DispatchRowProps) {
    return (
        <FormRow
            label={dispatch.data.type}
            subLabel={dispatch.time}
            trailing={FormRow.Arrow}
            onPress={() => navigation.push("VendettaCustomPage", {
                title: "Dispatch",
                render: () => <InspectDispatch dispatch={dispatch} />
            })}
        />
    )
}