import { ReactNative as RN } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

const { FormInput } = Forms;

export default () => {
    useProxy(storage);

    return (
        <RN.ScrollView>
            <FormInput
                title="EMOJI SIZE (must be divisible by 16)"
                placeholder="64"
                value={storage.emojiSize}
                onChange={(v: string) => storage.emojiSize = v}
            />
        </RN.ScrollView>
    )
}