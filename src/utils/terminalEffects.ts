import { ExtendedTerminal } from "../types/extendedTerminal";

export function triggerFall(term: ExtendedTerminal) {
    const terminal = document.querySelector('.TerminalContainer');
    if (!terminal) return;

    const textContent = Array.from(terminal.querySelectorAll('.xterm-rows > div'))
        .map(line => line.textContent)
        .join('');

    const characters = textContent.split('').map((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'terminal-character';
        span.style.position = 'relative';
        span.style.display = 'inline-block';
        return span;
    });

    terminal.innerHTML = '';
    characters.forEach((char) => terminal.appendChild(char));

    const terminalHeight = terminal.clientHeight;
    const terminalTop = terminal.getBoundingClientRect().top;

    setTimeout(() => {
        characters.forEach((char) => {
            const charTopPosition = char.getBoundingClientRect().top;
            const charHeight = char.offsetHeight;
            const translateY = terminalHeight - (charTopPosition - terminalTop) - charHeight;
            char.style.transition = `transform 1s ease-in`;
            char.style.transform = `translateY(${translateY}px) rotate(${Math.random() * 360}deg)`;
        });

        setTimeout(() => {
            displayMessage(term);
        }, 1000);
    }, 0);
}

function displayMessage(term: ExtendedTerminal) {
    const terminal = document.querySelector('.TerminalContainer');
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    messageContainer.style.textAlign = 'center';
    messageContainer.style.position = 'absolute';
    messageContainer.style.top = '50%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translate(-50%, -50%)';
    messageContainer.style.zIndex = '10';

    const messageText = document.createElement('p');
    messageText.textContent = term.translate('commands.killer.broke');
    messageText.style.fontSize = '24px';
    messageText.style.font = "Monaco, monospace";
    messageText.style.color = "red";

    messageContainer.appendChild(messageText);
    terminal?.appendChild(messageContainer);
}
