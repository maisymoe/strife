import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";

const { FormRow, FormLabel, FormSubLabel, FormRadio } = Forms;

interface FontRowProps {
    title: string;
    fontFamily: string;
}

const placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
storage.selectedFont ??= "gg sans";

export default ({ title, fontFamily }: FontRowProps) => {
    useProxy(storage);

    return (
        <FormRow
            label={<FormLabel style={{ fontFamily }} text={title} />}
            subLabel={<FormSubLabel style={{ fontFamily }} text={placeholder}></FormSubLabel>}
            trailing={<FormRadio selected={title === storage.selectedFont} />}
            onPress={() => {
                storage.selectedFont = title;
                showToast(`${title} selected!`, getAssetIDByName("Check"));
            }}
        />
    )
}