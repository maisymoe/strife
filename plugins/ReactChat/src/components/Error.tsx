import { React, ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";

const { FormText } = Forms;

interface ErrorBoundaryProps {
    error: string;
}

const styles = stylesheet.createThemedStyleSheet({
    title: {
        fontSize: 20,
    }
});

export default function Error({ error }: ErrorBoundaryProps) {
    return (
        <RN.View>
            <FormText style={styles.title}>Well shit.</FormText>
            <FormText>{error}</FormText>
        </RN.View>
    )
}