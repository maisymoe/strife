const { logger } = vendetta;

export function onLoad() {
    logger.log("Hello world!");
}

export function onUnload() {
    logger.log("Goodbye, world.");
}

export { default as settings } from "./Settings";