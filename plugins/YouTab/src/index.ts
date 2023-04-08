import { findByName, findByStoreName } from "@vendetta/metro";
import patchScreens from "./patches/patchScreens";
import patchTitles from "./patches/patchTitles";

const getScreens = findByName("getScreens");
const { getCurrentUser } = findByStoreName("UserStore");
export const screens = getScreens(getCurrentUser());

const patches = [
    patchScreens(),
    patchTitles(),
];

export const onUnload = () => patches.forEach(p => p());