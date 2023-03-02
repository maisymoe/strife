import { findByProps, findByDisplayName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { safeFetch } from "@vendetta/utils";
import { logger } from "@vendetta";
import { CLIENT_ID, API_URL } from "./constants";

const { pushModal, popModal } = findByProps("pushModal");
const OAuth2AuthorizeModal = findByDisplayName("OAuth2AuthorizeModal");

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
            redirectUri: API_URL + "/URauth",
            scopes: ["identify"],
            responseType: "code",
            permissions: 0n,
            cancelCompletesFlow: false,
            callback: async ({ location }) => {
                try {
                    const url = new URL(location);
                    url.searchParams.append("returnType", "json");
                    url.searchParams.append("clientMod", "vendetta");

                    // TODO: safeFetch should, by all means, accept a URL. Why doesn't it?
                    const res = await safeFetch(url.toString(), { headers: { accept: "application/json" } });
                    const { token, status } = await res.json();

                    if (status === 0) {
                        storage.authToken = token;
                    } else {
                        throw new Error("Status returned by backend was not OK");
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
