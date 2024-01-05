import { instead } from "@vendetta/patcher";

export const noop = (prop: string, parent: any) => instead(prop, parent, () => {});
