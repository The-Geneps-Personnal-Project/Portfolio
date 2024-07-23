import { useCallback } from 'react';
import { ExtendedTerminal } from '../types/extendedTerminal';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';
import { colors } from '../utils/colors';
import { printHome, handleCommand, getCommands } from '../utils/commands';
import { showAutocomplete } from '../utils/autocomplete';

export const useTerminal = () => {
  const initializeTerminal = useCallback((container: HTMLDivElement) => {
    const term = new ExtendedTerminal({
      cursorBlink: true,
      cursorStyle: 'block',
      theme: {
        background: '#1d1f21',
        foreground: '#c5c8c6',
      },
    });

    const fitAddon = new FitAddon();
    const searchAddon = new SearchAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());
    term.loadAddon(searchAddon);
    term.open(container);
    fitAddon.fit();

    const history: string[] = [];
    let historyIndex = -1;

    window.addEventListener('resize', () => {
      fitAddon.fit();
    });

    printHome(term, true);

    let commandBuffer = '';
    let autocompleteBuffer = '';

    const clearAutocomplete = () => {
      if (autocompleteBuffer.length > 0) {
        term.write('\x1B[2K\r'); // Clear entire line
        term.write(`${colors.pink}> ${colors.reset}` + commandBuffer); // Rewrite the prompt and command buffer
        autocompleteBuffer = '';
      }
    };

    const updateCommandBuffer = (newBuffer: string) => {
      term.write('\x1B[2K\r'); // Clear entire line
      term.write(`${colors.pink}> ${colors.reset}` + newBuffer); // Rewrite the prompt and command buffer
      commandBuffer = newBuffer;
    };

    term.prompt = () => {
      term.write(`\n${colors.blue}~/home/${colors.reset}\r\n${colors.pink}> ${colors.reset}`);
    };

    term.onKey(e => {
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.key === "Enter") {
        clearAutocomplete();
        term.write('\r\n'); // Move to the next line
        if (commandBuffer.trim()) {
          handleCommand(term, commandBuffer);
          history.unshift(commandBuffer);
          historyIndex = -1;
        }
        commandBuffer = '';
      } else if (ev.key === "Backspace") {
        clearAutocomplete();
        if (commandBuffer.length > 0) {
          commandBuffer = commandBuffer.slice(0, -1);
          term.write('\b \b');
        }
      } else if (ev.key === "Tab") {
        if (autocompleteBuffer.length > 0) {
          term.write(autocompleteBuffer); // Write the autocomplete buffer in normal color
          commandBuffer += autocompleteBuffer; // Accept autocomplete
          autocompleteBuffer = '';
          ev.preventDefault(); // Prevent default tab behavior
        }
      } else if (ev.key === "ArrowUp") {
        clearAutocomplete();
        if (history.length > 0) {
          historyIndex = Math.min(historyIndex + 1, history.length - 1);
          updateCommandBuffer(history[historyIndex] || '');
        }
      } else if (ev.key === "ArrowDown") {
        clearAutocomplete();
        if (history.length > 0) {
          historyIndex = Math.max(historyIndex - 1, -1);
          updateCommandBuffer(historyIndex >= 0 ? history[historyIndex] : '');
        }
      } else if (printable) {
        clearAutocomplete();
        commandBuffer += e.key;
        term.write(e.key);
        autocompleteBuffer = showAutocomplete(term, commandBuffer);
      }
    });

    return term;
  }, []);

  return { initializeTerminal };
};
