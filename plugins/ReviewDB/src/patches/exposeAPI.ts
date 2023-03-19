import * as api from "../lib/api";
import * as utils from "../lib/utils";
import * as constants from "../lib/constants";
import showAuthModal from "../lib/showAuthModal";
import showReviewActionSheet from "../lib/showReviewActionSheet";

export default () => {
    globalThis.vendettaRDB = {
        api,
        utils: { ...utils, showAuthModal, showReviewActionSheet },
        constants,
    };

    return () => delete globalThis.vendettaRDB;
}