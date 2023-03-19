import { storage } from "@vendetta/plugin";
import { getAdmins } from "./lib/api";
import patchProfile from "./patches/patchProfile";
import exposeAPI from "./patches/exposeAPI";

// Default settings
// TODO: Do I need to do this?
storage.authToken ??= "";

const patches = [
    exposeAPI(),
    patchProfile(),
];

export const admins = [];
getAdmins().then(i => admins.push(...i));

export const onUnload = () => patches.forEach(p => p());

export { default as settings } from "./Settings";