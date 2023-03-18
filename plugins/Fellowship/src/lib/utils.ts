import { logger } from "@vendetta";

export const stub = (name: string, ret?: any) => {
    logger.warn(`Tried to call ${name}, not implemented!`);
    return ret;
}