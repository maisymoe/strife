import { ReactNative as RN } from "@vendetta/metro/common";
import IconRow from "./components/IconRow";

export default () => (
    <RN.ScrollView style={{ flex: 1 }}>
        <IconRow title="Plumpy" icons={[
            "https://raw.githubusercontent.com/acquitelol/rosiecord/master/Packs/Plumpy/images/native/main_tabs/Messages%403x.png",
            "https://raw.githubusercontent.com/acquitelol/rosiecord/master/Packs/Plumpy/images/native/main_tabs/Mentions%403x.png",
            "https://raw.githubusercontent.com/acquitelol/rosiecord/master/Packs/Plumpy/images/native/main_tabs/Friends%403x.png",
            "https://raw.githubusercontent.com/acquitelol/rosiecord/master/Packs/Plumpy/images/native/main_tabs/Search%403x.png",
        ]} />
        <IconRow title="Iconsax" icons={[
            "https://raw.githubusercontent.com/acquitelol/rosiecord/master/Packs/Iconsax/images/native/main_tabs/Messages%403x.png",
            "https://raw.githubusercontent.com/acquitelol/rosiecord/master/Packs/Iconsax/images/native/main_tabs/Mentions%403x.png",
            "https://raw.githubusercontent.com/acquitelol/rosiecord/master/Packs/Iconsax/images/native/main_tabs/Friends%403x.png",
            "https://raw.githubusercontent.com/acquitelol/rosiecord/master/Packs/Iconsax/images/native/main_tabs/Search%403x.png",
        ]} />
    </RN.ScrollView>
)