import { find, findAll } from "@vendetta/metro";

// TODO: This really isn't compliant to the original API...
// For example, there is no support for bulk finding or traversal, and limited support for defaultExport.
interface FindOptions {
    all?: boolean;
    traverse?: boolean;
    defaultExport?: boolean;
}

// https://github.com/enmity-mod/enmity/blob/6b5a57a52173071e5c9a40c55a8bb4183a96a9e4/src/modules/metro/index.ts#L342-L344
const parseOptions = (args: any[], filter = o => typeof o === "object" && !Array.isArray(o)) => [args, filter(args[args.length - 1]) ? args.pop() : {}];

type Filter = (m: any) => boolean;
export const getModule = (filter: Filter, options: FindOptions) => options.all ? findAll(filter) : find(filter);
export const getModules = (filter: Filter) => getModule(filter, { all: true });

export const filters = {
    byProps: (props: (string | symbol)[]) => (m: any) => props.every((p) => m[p] !== undefined),
    byDisplayName: (name: string, defaultExp: boolean) => (defaultExp ? (m: any) => m?.displayName === name : (m: any) => m?.default?.displayName === name),
    byTypeName: (name: string, defaultExp: boolean) => (defaultExp ? (m: any) => m?.type?.name === name : (m: any) => m?.default?.type?.name === name),
    byName: (name: string, defaultExp: boolean) => (defaultExp ? (m: any) => m?.name === name : (m: any) => m?.default?.name === name),
}

export const getByProps = (...options: any[]) => {
    const [props, opts] = parseOptions(options);
    return getModule(filters.byProps(props), opts);
}

export const getByDisplayName = (...options: any[]) => {
    const [names, opts] = parseOptions(options);
    return getModule(filters.byDisplayName(names[0], opts.default), opts);
}

export const getByTypeName = (...options: any[]) => {
    const [names, opts] = parseOptions(options);
    return getModule(filters.byTypeName(names[0], opts.default), opts);
}

export const getByName = (...options: any[]) => {
    const [names, opts] = parseOptions(options);
    return getModule(filters.byName(names[0], opts.default), opts);
}