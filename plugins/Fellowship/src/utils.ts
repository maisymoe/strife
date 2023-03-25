import { logger } from "@vendetta";

export function stub(name: string, ret?: any) {
    logger.warn(`Tried to call ${name}, not implemented!`);
    return ret;
}