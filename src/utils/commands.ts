import i18n from "../i18n/i18n";
import { ExtendedTerminal } from "../types/extendedTerminal";
import { colors, replaceColors } from "./colors";
import { getProjects } from "./projects";

type CommandFunction = (term: ExtendedTerminal, args?: string[]) => void;

function cd(term: ExtendedTerminal) {
    term.writeln(replaceColors(term.translate("commands.cd")));
}

function ls(term: ExtendedTerminal) {
    term.write(`${colors.blue}Documents${colors.reset}  `);
    term.write(`${colors.blue}Downloads${colors.reset}  `);
    term.write(`${colors.blue}Pictures${colors.reset}  `);
    term.write(`${colors.blue}Videos${colors.reset}  `);
    term.write(`${colors.blue}Music${colors.reset}  `);
    term.writeln(`credentials.txt`);
}

function cat(term: ExtendedTerminal, args?: string[]) {
    if (args && args.length > 0) {
        const fileName = args[0];
        if (fileName === "credentials.txt") {
            term.writeln(term.translate("commands.cat.success"));
            term.writeln(term.translate("commands.cat.password"))
        } else {
            term.writeln(term.translate("commands.cat.error", {0: fileName}));
        }
    } else {
        term.writeln(term.translate("commands.cat.unnamed"));
    }
}

function help(term: ExtendedTerminal) {
    term.writeln(term.translate("commands.help.description"));
    term.writeln(term.translate("commands.help.help"));
    term.writeln(term.translate("commands.help.projects"));
    term.writeln(term.translate("commands.help.proj"))
    term.writeln(term.translate("commands.help.whoami"));
    term.writeln(term.translate("commands.help.lang"))
}

function clear(term: ExtendedTerminal) {
    term.clear();
    printHome(term);
}

function projects(term: ExtendedTerminal, args?: string[]) {
    if (args && args.length > 0) {
        const projectName = args[0];
        const project = getProjects(term).find(p => p.name.toLowerCase() === projectName.toLowerCase());
        if (project) {
            term.writeln(replaceColors(term.translate("commands.projects.name", {0: project.name})));
            term.writeln(`${colors.green}Description:${colors.reset} ${project.description}`);
            term.writeln(`\n${colors.green}Tech Stack:${colors.reset}`);
            project.techStack.forEach(stack => {
                term.writeln(`\t\u25CF ${stack}`);
            });
            term.writeln(`\n${colors.green}Github:${colors.reset}`)
            project.github.forEach(page => {
                term.writeln(`\t\u25B6 ${page}`);
            })
        } else {
            term.writeln(replaceColors(term.translate("commands.projetcs.notfound", {0: projectName})));
        }
    } else {
        term.writeln(term.translate("commands.projects.error"));
        getProjects(term).forEach(project => term.writeln(`\u25CF ${project.name}`));
    }
}

export const printHome = (term: ExtendedTerminal, prompt: boolean = false) => {
    term.writeln(term.translate("welcome.home"));
    term.writeln(replaceColors(term.translate("welcome.help")));
    term.writeln("");
    if (prompt) term.write(`${colors.blue}~/home/${colors.reset}\r\n${colors.pink}> ${colors.reset}`);
};

const whoami = (term: ExtendedTerminal) => {
    term.writeln(term.translate("commands.whoami.name"));
    term.writeln(term.translate("commands.whoami.position"));
    term.writeln("Location: Lille, France");
    term.writeln("Email: adabin@hotmail.fr");
    term.writeln("Github: https://github.com/A-DBN");
    term.writeln("LinkedIn: https://www.linkedin.com/in/antoine-dabin/");
};

const lang = (term: ExtendedTerminal, args?: string[]) => {
    if (args?.length === 0) term.writeln(term.translate("commands.lang.error"))
    else if (!["fr", "en"].includes(args![0])) term.writeln(term.translate("commands.lang.notfound", {0: args![0]}))
    else {i18n.changeLanguage(args![0]); clear(term)}
}

export const handleCommand = (term: ExtendedTerminal, command: string) => {
    const commands: { [key: string]: CommandFunction } = {
        help,
        clear,
        whoami,
        projects,
        cd,
        ls,
        cat,
        lang
    };

    const [cmd, ...args] = command.trim().split(/\s+/);

    term.writeln("");

    if (commands[cmd]) {
        commands[cmd](term, args);
    } else {
        term.writeln(term.translate("commands.notfound", {0: cmd}));
    }
};

export const getCommands = (): string[] => {
    return ["help", "projects", "whoami", "clear"];
};
