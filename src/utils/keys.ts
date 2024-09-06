import { ExtendedTerminal } from "../types/extendedTerminal";
import { handleCommand } from "./commands";
import { clearAutocomplete } from "./autocomplete";

export function Enter(
    term: ExtendedTerminal,
    commandBuffer: string,
    history: string[],
    autocompleteBuffer: string,
    updateCommandBuffer: (newBuffer: string) => void,
    updateAutocompleteBuffer: (newBuffer: string) => void,
    setHistoryIndex: (index: number) => void
) {
    autocompleteBuffer = clearAutocomplete(autocompleteBuffer, term, commandBuffer, updateAutocompleteBuffer)!;
    term.write("\r\n");
    if (commandBuffer.trim()) {
        handleCommand(term, commandBuffer);
        history.unshift(commandBuffer);
        setHistoryIndex(-1);
    }
    term.prompt();
    updateCommandBuffer("");
}

export function Backspace(
    term: ExtendedTerminal,
    commandBuffer: string,
    autocompleteBuffer: string,
    updateCommandBuffer: (newBuffer: string) => void,
    updateAutocompleteBuffer: (newBuffer: string) => void
) {
    autocompleteBuffer = clearAutocomplete(autocompleteBuffer, term, commandBuffer, updateAutocompleteBuffer)!;
    if (commandBuffer.length > 0) {
        commandBuffer = commandBuffer.slice(0, -1);
        term.write("\b \b");
    }
    updateCommandBuffer(commandBuffer);
    updateAutocompleteBuffer("");
}

export function Tab(
    term: ExtendedTerminal,
    autocompleteBuffer: string,
    commandBuffer: string,
    ev: KeyboardEvent,
    updateCommandBuffer: (newBuffer: string) => void,
    updateAutocompleteBuffer: (newBuffer: string) => void
) {
    if (autocompleteBuffer.length > 0) {
        term.write(autocompleteBuffer);
        commandBuffer += autocompleteBuffer;
        autocompleteBuffer = "";
        ev.preventDefault();
    }
    updateCommandBuffer(commandBuffer);
    updateAutocompleteBuffer("");
}

export function ArrowUp(
    term: ExtendedTerminal,
    history: string[],
    historyIndex: number,
    setHistoryIndex: (index: number) => void,
    updateCommandBuffer: (newBuffer: string) => void
) {
    if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        updateCommandBuffer(history[newIndex] || "");
    }
}

export function ArrowDown(
    term: ExtendedTerminal,
    history: string[],
    historyIndex: number,
    setHistoryIndex: (index: number) => void,
    updateCommandBuffer: (newBuffer: string) => void
) {
    if (history.length > 0) {
        const newIndex = Math.max(historyIndex - 1, -1);
        setHistoryIndex(newIndex);
        updateCommandBuffer(newIndex >= 0 ? history[newIndex] : "");
    }
}
