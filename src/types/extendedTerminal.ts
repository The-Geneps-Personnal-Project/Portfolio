import { Terminal } from 'xterm';
import {colors} from '../utils/colors';

export class ExtendedTerminal extends Terminal {
  prompt() {
    this.write(`${colors.blue}~/home/portfolio${colors.reset}\r\n${colors.pink}> ${colors.reset}`);
  }
}
