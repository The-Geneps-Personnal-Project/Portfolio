import { ExtendedTerminal } from '../types/extendedTerminal';
import { colors } from './colors';
import { getProjects } from './projects';

type CommandFunction = (term: ExtendedTerminal, args?: string[]) => void;

function cd(term: ExtendedTerminal) {
    term.writeln(`${colors.red}How dare you leave this place${colors.reset}`);
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
        if (fileName === 'credentials.txt') {
            term.writeln('#TODO: Move to a safer place the credentials\n');
            term.writeln('username: admin');
            term.writeln('password: 1234');
        } else {
            term.writeln(`${colors.red}File not found: ${fileName}${colors.reset}`);
        }
    } else {
        term.writeln('Please provide a file name');
    }

}

function help(term: ExtendedTerminal) {
    term.writeln('Available commands:');
    term.writeln('help - Show available commands');
    term.writeln('projects - List my projects');
    term.writeln('whoami - Show who I am');
}

function clear(term: ExtendedTerminal) {
    term.clear();
    printHome(term);
}

function projects(term: ExtendedTerminal, args?: string[]) {
    if (args && args.length > 0) {
        const projectName = args[0];
        const project = getProjects().find(p => p.name.toLowerCase() === projectName.toLowerCase());
        if (project) {
            term.writeln(`\n${colors.green}Project Name:${colors.reset} ${project.name}`);
            term.writeln(`${colors.green}Description:${colors.reset} ${project.description}`);
            term.writeln(`\n${colors.green}Tech Stack:${colors.reset}`);
            project.techStack.forEach(stack => {
                term.writeln(`\t\u25CF ${stack}`);
            });
            term.writeln(`\n${colors.green}Github:${colors.reset} \u25B6 ${project.github}`);
        } else {
            term.writeln(`${colors.red}Project not found: ${projectName}${colors.reset}`);
        }
    } else {
        term.writeln('Please provide a project name. Available projects are:');
        getProjects().forEach(project => term.writeln(`\u25CF ${project.name}`));
    }
}

export const printHome = (term: ExtendedTerminal, prompt: boolean = false) => {
    term.writeln('Welcome to my portfolio!');
    term.writeln('Type help to see available commands');
    term.writeln('');
    if (prompt) term.write(`${colors.blue}~/home/${colors.reset}\r\n${colors.pink}> ${colors.reset}`);
};

const whoami = (term: ExtendedTerminal) => {
    term.writeln("Name: Antoine Dabin");
    term.writeln("Occupation: Software Developer");
    term.writeln("Location: Lille, France");
    term.writeln("Email: adabin@hotmail.fr");
    term.writeln("Github: https://github.com/A-DBN");
    term.writeln("LinkedIn: https://www.linkedin.com/in/antoine-dabin/");
};

export const handleCommand = (term: ExtendedTerminal, command: string) => {
    const commands: { [key: string]: CommandFunction } = {
        help,
        clear,
        whoami,
        projects,
        cd,
        ls,
        cat
    };

    const [cmd, ...args] = command.trim().split(/\s+/);

    term.writeln('');

    if (commands[cmd]) {
        commands[cmd](term, args);
    } else {
        term.writeln(`Command not found: ${cmd}`);
    }

    term.prompt();
};

export const getCommands = (): string[] => {
    return ['help', 'projects', 'whoami', 'clear'];
};