import { ExtendedTerminal } from "../types/extendedTerminal";
import { getCommands } from "./commands";
import { getProjects } from "./projects";
import { colors } from "./colors";
import { Terminal } from "xterm";

export const showAutocomplete = (term: Terminal, partialCommand: string): string => {
    const [cmd, ...args] = partialCommand.trim().split(/\s+/);
    if (cmd === "projects" && args.length > 0) {
        const projectNamePart = args.join(" ");
        const matches = getProjects()
            .map(p => p.name)
            .filter(name => name.toLowerCase().startsWith(projectNamePart.toLowerCase()));
        if (matches.length === 1) {
            const completion = matches[0].substring(projectNamePart.length);
            term.write(`\x1B[38;5;240m${completion}\x1B[0m`);
            term.write("\b".repeat(completion.length));
            return completion;
        } else {
            return "";
        }
    } else {
        const commands = getCommands();
        const matches = commands.filter(c => c.startsWith(partialCommand));
        if (matches.length === 1) {
            const completion = matches[0].substring(partialCommand.length);
            term.write(`\x1B[38;5;240m${completion}\x1B[0m`);
            term.write("\b".repeat(completion.length));
            return completion;
        } else {
            return "";
        }
    }
};

export const clearAutocomplete = (autocompleteBuffer: string, term: ExtendedTerminal, commandBuffer: string): string => {
    if (autocompleteBuffer.length > 0) {
        term.write("\x1B[2K\r");
        term.write(`${colors.pink}> ${colors.reset}${commandBuffer}`);
        return "";
    }
    return autocompleteBuffer;
};
