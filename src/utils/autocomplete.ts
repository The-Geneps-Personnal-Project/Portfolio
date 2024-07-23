import { ExtendedTerminal } from '../types/extendedTerminal';
import { getCommands } from './commands';
import { getProjects } from './projects';

export const showAutocomplete = (term: ExtendedTerminal, partialCommand: string, ) => {
  const [cmd, ...args] = partialCommand.trim().split(/\s+/);
  if (cmd === 'projects' && args.length > 0) {
    const projectNamePart = args.join(' ');
    const matches = getProjects().map(p => p.name).filter(name => name.toLowerCase().startsWith(projectNamePart.toLowerCase()));
    if (matches.length === 1) {
      const completion = matches[0].substring(projectNamePart.length);
      term.write(`\x1B[38;5;240m${completion}\x1B[0m`); // Write in dim color
      term.write('\b'.repeat(completion.length)); // Move cursor back
      return completion;
    } else {
      return '';
    }
  } else {
    const commands = getCommands();
    const matches = commands.filter(cmd => cmd.startsWith(partialCommand));
    if (matches.length === 1) {
      const completion = matches[0].substring(partialCommand.length);
      term.write(`\x1B[38;5;240m${completion}\x1B[0m`); // Write in dim color
      term.write('\b'.repeat(completion.length)); // Move cursor back
      return completion;
    } else {
      return '';
    }
  }
};
