import React, { useEffect, useRef } from "react";
import "xterm/css/xterm.css";
import { useTerminal } from "../hooks/useTerminal";
import { ExtendedTerminal } from "../types/extendedTerminal";

const TerminalComponent: React.FC = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const terminalInstance = useRef<ExtendedTerminal | null>(null);
    const { initializeTerminal } = useTerminal();

    useEffect(() => {
        if (terminalRef.current && !terminalInstance.current) {
            terminalInstance.current = initializeTerminal(terminalRef.current);
        }
    }, [initializeTerminal]);

    return <div ref={terminalRef} className="TerminalContainer" />;
};

export default TerminalComponent;
