import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";

interface RadioRowProps {
    name: string;
    id: string;
}

const { FormRow, FormRadioRow } = Forms;

export default function RadioRow({ name, id }: RadioRowProps) {
    const isPinned = storage.pinnedPlugins[id];

    return (
        <FormRadioRow
            label={name}
            trailing={FormRow.Arrow}
            selected={isPinned}
            onPress={() => {
                if (!isPinned) {
                    storage.pinnedPlugins[id] = true;
                } else {
                    delete storage.pinnedPlugins[id];
                }
            }}
        />
    )
}