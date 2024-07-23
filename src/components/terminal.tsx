import React, { useEffect, useRef } from 'react';
import 'xterm/css/xterm.css';
import { useTerminal } from '../hooks/useTerminal';

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { initializeTerminal } = useTerminal();

  useEffect(() => {
    console.log(terminalRef.current)
    if (terminalRef.current) {
      initializeTerminal(terminalRef.current);
    }
  }, [initializeTerminal]);

  return <div ref={terminalRef} className="TerminalContainer" />;
};

export default TerminalComponent;
