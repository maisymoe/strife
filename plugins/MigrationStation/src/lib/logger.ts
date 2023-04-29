import { createProxy } from "@vendetta/storage"
import { Log, LogType } from "../def";

export const logs = createProxy<Log[]>([]).proxy;
export const log = (source: string, message: string, type: LogType = "info") => logs.push({ source, message, type });
export const create = (source: string) => (message: string, type: LogType = "info") => log(source, message, type);