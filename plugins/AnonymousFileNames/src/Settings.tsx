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
                title="FILENAME LENGTH"
                keyboardType="numeric"
                placeholder="8"
                value={storage.nameLength.toString()}
                onChange={(v: string) => storage.nameLength = v.replace(/[^0-9]/g, "")}
            />
        </RN.ScrollView>
    )
}