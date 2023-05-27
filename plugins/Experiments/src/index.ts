import { FluxDispatcher, ReactNative } from "@vendetta/metro/common";
import { findByStoreName } from "@vendetta/metro";
import { showConfirmationAlert } from "@vendetta/ui/alerts";
import { enable, payload } from "./snippet";

// TODO: With this method, UserStore is found twice, once here and once in ./snippet.ts
//? Probably makes no impact but might be worth looking into?
const { getCurrentUser } = findByStoreName("UserStore");
getCurrentUser() ? enable() : FluxDispatcher.subscribe("CONNECTION_OPEN", payload);

export const onUnload = () => showConfirmationAlert({
    title: "Wait!",
    content: "Disabling experiments requires a restart - would you like to do that now?",
    confirmText: "Sure",
    cancelText: "Not now",
    // @ts-expect-error oh god
    confirmColor: "red",
    onConfirm: ReactNative.NativeModules.BundleUpdaterManager.reload,
});