import { logger } from "@vendetta";

export const stub = (name: string) => logger.warn(`Tried to call ${name}, not implemented!`);