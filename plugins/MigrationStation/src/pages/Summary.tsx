import { React, ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { findByProps } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { Forms } from "@vendetta/ui/components";
import FormHeader from "../components/FormHeader";

const Button = findByProps("Looks", "Colors", "Sizes") as any;

const styles = stylesheet.createThemedStyleSheet({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    textContainer: {
        marginTop: 24,
        alignItems: "center",
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 256,
        height: 256,
        resizeMode: "contain"
    },
    buttonsContainer: {
        padding: 24,
    }
})

const { FormText } = Forms;

interface ActionButton {
    text: string,
    onPress: Function;
}

interface SummaryProps {
    headerText: string,
    bodyText: string,
    buttons: ActionButton[],
}

export default ({ headerText, bodyText, buttons }: SummaryProps) => {
    return (
        <RN.View style={styles.container}>
            <RN.View style={styles.textContainer}>
                <FormHeader>{headerText}</FormHeader>
                <FormText>{bodyText}</FormText>
                <RN.View style={styles.imageContainer}>
                    <RN.Image source={getAssetIDByName("img-wumpus-wave")} style={styles.image} />
                </RN.View>
            </RN.View>
            <RN.View style={styles.buttonsContainer}>
                {buttons.map(b => <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={b.onPress}
                    text={b.text}
                />)}
            </RN.View>
        </RN.View>
    )
}