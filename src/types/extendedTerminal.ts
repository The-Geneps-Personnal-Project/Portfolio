import { Terminal, ITerminalOptions } from "xterm";
import { colors } from "../utils/colors";
import i18next, { TFunction } from "i18next";

export class ExtendedTerminal extends Terminal {
    private t: TFunction;

    constructor(t: TFunction, options?: ITerminalOptions) {
        super(options);
        this.t = t;
    }

    prompt() {
        this.write(`${colors.blue}~/home/portfolio${colors.reset}\r\n${colors.pink}> ${colors.reset}`);
    }

    translate(messageKey: string, variables?: Record<string, any>): string {
        const message = this.t(messageKey, variables);
        return message;
    }

    isLanguage(lang: string): boolean {
        return i18next.language === lang;
    }
}
