import type { Command } from "enmity/api/commands";
import { registerCommand } from "@vendetta/commands";

const registeredCommands: Record<string, (() => void)[]> = {};

export function registerCommands(caller: string, commands: Command[]) {
    // TODO: Enmity does very specific argument validity checking here
    //? We probably don't need to, right?

    registeredCommands[caller] ??= [];
    for (const command of commands) {
        registeredCommands[caller].push(registerCommand({
            name: command.name,
            displayName: command.name,
            description: command.description,
            displayDescription: command.description,
            type: 1, // ApplicationCommandType.CHAT
            inputType: 1, //ApplicationCommandInputType.BUILT_IN_TEXT
            applicationId: "-1",
            options: (command.options as any),
            execute: command.execute,
        }));
    }
}

export const unregisterCommands = (caller: string) => registerCommands[caller]?.forEach(c => c());