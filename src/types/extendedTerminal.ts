import { Terminal, ITerminalOptions } from "xterm";
import { colors } from "../utils/colors";
import i18next, { TFunction } from "i18next";

export class ExtendedTerminal extends Terminal {
    private t: TFunction;
    private path: string = "~/home/";

    constructor(t: TFunction, options?: ITerminalOptions) {
        super(options);
        this.t = t;
    }

    prompt() {
        this.write(`${colors.blue}${this.path}${colors.reset}\r\n${colors.pink}> ${colors.reset}`);
    }

    setPath(path: string) {
        this.path = path;
    }

    getPath() {
        return this.path;
    }

    translate(messageKey: string, variables?: Record<string, any>): string {
        const message = this.t(messageKey, variables);
        return message;
    }

    isLanguage(lang: string): boolean {
        return i18next.language === lang;
    }
}
