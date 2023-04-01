import { ReactNative as RN, navigation, navigationStack, NavigationNative, stylesheet, constants } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { ErrorBoundary } from "@vendetta/ui/components";

export interface ModalProps {
    title: string;
    children: JSX.Element;
}

const styles = stylesheet.createThemedStyleSheet({
    container: {
        backgroundColor: semanticColors.BACKGROUND_MOBILE_SECONDARY,
        flex: 1,
    },
    card: {
        backgroundColor: semanticColors.BACKGROUND_MOBILE_PRIMARY,
        color: semanticColors.TEXT_NORMAL,
    },
    header: {
        backgroundColor: semanticColors.BACKGROUND_MOBILE_SECONDARY,
        shadowColor: "transparent",
        elevation: 0,
    },
    headerTitleContainer: {
        color: semanticColors.HEADER_PRIMARY,
    },
    headerTitle: {
        fontFamily: constants.Fonts.PRIMARY_BOLD,
        color: semanticColors.HEADER_PRIMARY,
    },
    backIcon: {
        tintColor: semanticColors.INTERACTIVE_ACTIVE,
        marginLeft: 15,
        marginRight: 20,
    }
});

export default function Modal({ title, children }: ModalProps) {
    const Stack = navigationStack.createStackNavigator();

    return (
        <ErrorBoundary>
            <NavigationNative.NavigationContainer independent>
                <Stack.Navigator
                    initialRouteName={title}
                    style={styles.container}
                    screenOptions={{
                        cardOverlayEnabled: false,
                        cardShadowEnabled: false,
                        cardStyle: styles.card,
                        headerStyle: styles.header,
                        headerTitleContainerStyle: styles.headerTitleContainer,
                    }}
                >
                    <Stack.Screen 
                        name={title}
                        component={children}
                        options={{
                            headerTitleStyle: styles.headerTitle,
                            headerLeft: () => (
                                <RN.TouchableOpacity
                                    onPress={() => navigation.pop()}
                                >
                                    <RN.Image style={styles.backIcon} source={getAssetIDByName("back-icon")} />
                                </RN.TouchableOpacity>
                            ),
                        }}
                    />
                </Stack.Navigator>
            </NavigationNative.NavigationContainer>
        </ErrorBoundary>
    )
}