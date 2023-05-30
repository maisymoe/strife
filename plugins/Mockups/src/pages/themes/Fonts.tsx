import { ReactNative as RN } from "@vendetta/metro/common";
import FontRow from "./components/FontRow";

export default () => (
    <RN.ScrollView style={{ flex: 1 }}>
        <FontRow title="gg sans" fontFamily="ggsans-Medium" />
        <FontRow title="Noto Sans" fontFamily="NotoSans-Medium" />
        <FontRow title="Source Code Pro" fontFamily="SourceCodePro-Semibold" />
        <FontRow title="System" fontFamily="blehh, i'm so silly!" />
    </RN.ScrollView>
)