// Main Scoundrel game component

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { DevTools } from './pages/DevTools';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameBoard />} />
        <Route path="/dev" element={<DevTools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
