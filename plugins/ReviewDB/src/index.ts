import { storage } from "@vendetta/plugin";
import { patchProfile } from "./patches/patchProfile";
import { getAdmins } from "./lib/api";

// Default settings
// TODO: Do I need to do this?
storage.authToken ??= "";

const patches = [
    patchProfile(),
];

export const admins = [];
getAdmins().then(i => admins.push(...i));

export const onUnload = () => patches.forEach(p => p());

export { default as settings } from "./Settings";