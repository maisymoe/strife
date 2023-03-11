import { React } from "@vendetta/metro/common";
import { find } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import ReviewSection from "../components/ReviewSection";

const UserProfile = find(m => m.type?.name === "UserProfile");

export const patchProfile = () => after("type", UserProfile, (args, ret) => {
    const profileCardSection = findInReactTree(ret, r =>
        r?.props?.children.find((res: any) => typeof res?.props?.displayProfile?.userId === "string") &&
        r?.type?.displayName === "View" &&
        Array?.isArray(r?.props?.style)
    )?.props?.children;

    const userId = args[0].userId;

    profileCardSection?.push(React.createElement(ReviewSection, { userId }));
});