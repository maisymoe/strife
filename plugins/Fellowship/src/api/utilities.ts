import { utils } from "@vendetta";
import { findByProps } from "@vendetta/metro";
import { React, ReactNative, lodash } from "@vendetta/metro/common";
import { stub } from "../utils";

const { uuid4 } = findByProps("uuid4");

export const memoize = (func: (...args: any[]) => any) => lodash.memoize(func);
export const debounce = (func: ((...args: any[]) => any), ms: number) => lodash.debounce(func, ms);
export const createStore = () => stub("createStore", {});
export const findInReactTree = (tree: object, filter = (i: any) => i, options = {}) => utils.findInTree(tree, filter, { walkable: ["props", "children"], ...options });
export const normalizeSize = ReactNative.PixelRatio.getPixelSizeForLayoutSize;
export const wrapInHooks = () => stub("wrapInHooks", React.createElement(ReactNative.Text, {}, "Stubbed wrapInHooks"));
export const findInTree = (tree = {}, filter = (i: any) => i, { ignore = [], walkable = [], maxProperties = 100 } = {}) => utils.findInTree(tree, filter, { ignore, walkable, maxDepth: maxProperties });
export const sleep = (time: number) => new Promise(i => setTimeout(i, time));
// TODO: Enmity's supports a length argument. Do we need to?
export const uuid = uuid4;