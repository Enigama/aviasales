import React from 'react';
import logo from './Logo.svg';
import './App.css';

import Tickets from "./components/Tickets/Tickets";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App__logo">
        <img src={logo} alt="logo" />
      </div>
      <Tickets />
    </div>
  );
}

export default App;
