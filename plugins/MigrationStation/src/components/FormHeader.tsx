import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";

const styles = stylesheet.createThemedStyleSheet({
    header: {
        color: semanticColors.HEADER_PRIMARY,
        fontSize: 32,
        fontFamily: "ggsans-Semibold, NotoSans-Semibold",
        textAlign: "center",
        lineHeight: 40,
    }
})

interface FormHeaderProps {
    children: string | JSX.Element;
}

export default ({ children }: FormHeaderProps) => <RN.Text style={styles.header}>{children}</RN.Text>