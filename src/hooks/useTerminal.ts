import { useCallback, useState, useRef } from "react";
import { ExtendedTerminal } from "../types/extendedTerminal";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { SearchAddon } from "@xterm/addon-search";
import { colors } from "../utils/colors";
import { printHome } from "../utils/commands";
import * as keys from "../utils/keys";
import { showAutocomplete } from "../utils/autocomplete";
import { useTranslation } from "react-i18next";

export const useTerminal = () => {
    const [history, setHistory] = useState<string[]>([]);
    const historyIndexRef = useRef(-1);

    // eslint-disable-next-line
    const { t } = useTranslation();

    const initializeTerminal = useCallback(
        (container: HTMLDivElement) => {
            const term = new ExtendedTerminal(t, {
                cursorBlink: true,
                cursorStyle: "block",
                theme: {
                    background: "#1d1f21",
                    foreground: "#c5c8c6",
                },
            });

            const fitAddon = new FitAddon();
            const searchAddon = new SearchAddon();
            term.loadAddon(fitAddon);
            term.loadAddon(new WebLinksAddon());
            term.loadAddon(searchAddon);
            term.open(container);
            fitAddon.fit();

            window.addEventListener("resize", () => {
                fitAddon.fit();
            });

            printHome(term, true);

            let commandBuffer = "";
            let autocompleteBuffer = "";

            const updateCommandBuffer = (newBuffer: string) => {
                term.write("\x1B[2K\r"); // Clear entire line
                term.write(`${colors.pink}> ${colors.reset}${newBuffer}`);
                commandBuffer = newBuffer;
            };

            const updateAutocompleteBuffer = (newBuffer: string) => {
                autocompleteBuffer = newBuffer;
            };

            const setHistoryIndex = (index: number) => {
                historyIndexRef.current = index;
            };

            term.prompt = () => {
                term.write(`\n${colors.blue}${term.getPath()}${colors.reset}\r\n${colors.pink}> ${colors.reset}`);
            };

            term.onKey(e => {
                const ev = e.domEvent;
                const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

                switch (ev.key) {
                    case "Enter":
                        keys.Enter(
                            term,
                            commandBuffer,
                            history,
                            autocompleteBuffer,
                            updateCommandBuffer,
                            updateAutocompleteBuffer,
                            setHistoryIndex
                        );
                        setHistory(prev => [commandBuffer, ...prev]);
                        break;
                    case "Backspace":
                        keys.Backspace(term, commandBuffer, autocompleteBuffer, updateCommandBuffer, updateAutocompleteBuffer);
                        break;
                    case "Tab":
                        keys.Tab(term, autocompleteBuffer, commandBuffer, ev, updateCommandBuffer, updateAutocompleteBuffer);
                        break;
                    case "ArrowUp":
                        keys.ArrowUp(term, history, historyIndexRef.current, setHistoryIndex, updateCommandBuffer);
                        break;
                    case "ArrowDown":
                        keys.ArrowDown(term, history, historyIndexRef.current, setHistoryIndex, updateCommandBuffer);
                        break;
                    default:
                        if (printable) {
                            commandBuffer += e.key;
                            term.write(e.key);
                            showAutocomplete(term, commandBuffer, updateAutocompleteBuffer);
                        }
                        break;
                }
            });

            return term;
        },
        [history, t]
    );

    return { initializeTerminal };
};
