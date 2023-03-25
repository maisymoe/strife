import { assets as _assets } from "@vendetta/ui";

export const assets = _assets.all;
export const find = _assets.find;

export const getByName = (name: string) => _assets.getAssetByName(name);
export const getByID = (id: number) => _assets.getAssetByID(id);
export const getIDByName = (name: string) => _assets.getAssetIDByName(name);

export const Icons = new Proxy({}, { get: (_, name: string) => _assets.getAssetIDByName(name) });