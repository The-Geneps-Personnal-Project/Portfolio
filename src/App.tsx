import React from "react";
import TerminalComponent from "./components/terminal";
import HelpWindow from "./components/helpWIndow";
import "./App.css";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <TerminalComponent />
            </header>
            <HelpWindow />
        </div>
    );
};

export default App;
