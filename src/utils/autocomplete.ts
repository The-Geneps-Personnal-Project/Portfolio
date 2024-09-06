import { ExtendedTerminal } from "../types/extendedTerminal";
import { getCommands } from "./commands";
import { getProjects } from "./projects";
import { colors } from "./colors";

export const showAutocomplete = (term: ExtendedTerminal, partialCommand: string, updateAutocompleteBuffer: (newBuffer: string) => void) => {
    const [cmd, ...args] = partialCommand.trim().split(/\s+/);
    const projectNamePart = args.join(" ");
    const getMatches = (list: string[], prefix: string) =>
        list.filter(item => item.toLowerCase().startsWith(prefix.toLowerCase()));

    const handleAutocomplete = (matches: string[], prefix: string) => {
        if (matches.length === 1) {
            const completion = matches[0].substring(prefix.length);
            term.write(`\x1B[38;5;240m${completion}\x1B[0m`);
            term.write("\b".repeat(completion.length));
            updateAutocompleteBuffer(completion);
        } else {
            term.write("\x1B[2K\r");
            term.write(`${colors.pink}> ${colors.reset}${partialCommand}`);
            updateAutocompleteBuffer("");
        }
    };

    if (cmd === "projects" && args.length > 0) {
        const matches = getMatches(getProjects(term).map(p => p.name), projectNamePart);
        handleAutocomplete(matches, projectNamePart);
    } else {
        const matches = getMatches(getCommands(), partialCommand);
        handleAutocomplete(matches, partialCommand);
    }
};

export const clearAutocomplete = (
    autocompleteBuffer: string,
    term: ExtendedTerminal,
    commandBuffer: string,
    updateAutocompleteBuffer: (newBuffer: string) => void
) => {
    if (autocompleteBuffer.length > 0) {
        term.write("\x1B[2K\r");
        term.write(`${colors.pink}> ${colors.reset}${commandBuffer}`);
        updateAutocompleteBuffer("");
    }
    updateAutocompleteBuffer(autocompleteBuffer);
};
