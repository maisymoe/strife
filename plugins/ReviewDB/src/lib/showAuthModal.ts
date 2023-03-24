import { findByProps, findByName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { logger } from "@vendetta";
import { CLIENT_ID, API_URL } from "./constants";
import { jsonFetch } from "./utils";

const { pushModal, popModal } = findByProps("pushModal");
const OAuth2AuthorizeModal = findByName("OAuth2AuthorizeModal");

// Thank you to Fiery for figuring out the base for this
// Some inspiration taken from https://github.com/Vendicated/Vencord/blob/77c691651e72ba1569666d560f96af04bfde9a4e/src/plugins/reviewDB/Utils/Utils.tsx#L39-L73
export default () => pushModal({
    key: "oauth2-authorize",
    modal: {
        key: "oauth2-authorize",
        modal: OAuth2AuthorizeModal,
        animation: "slide-up",
        shouldPersistUnderModals: false,
        props: {
            clientId: CLIENT_ID,
            redirectUri: API_URL + "/auth",
            scopes: ["identify"],
            responseType: "code",
            permissions: 0n,
            cancelCompletesFlow: false,
            callback: async ({ location }) => {
                try {
                    const url = new URL(location);
                    url.searchParams.append("returnType", "json");
                    url.searchParams.append("clientMod", "vendetta");

                    const { token, success, message } = await jsonFetch(url, { headers: { accept: "application/json" } });

                    if (success) {
                        storage.authToken = token;
                    } else {
                        popModal("oauth2-authorize");
                        throw new Error(message);
                    }
                } catch(e) {
                    // TODO: Do we need a toast?
                    logger.error("Authorization failed!", e);
                }
            },
            dismissOAuthModal: () => popModal("oauth2-authorize"),
        },
        closable: true,
    },
});
