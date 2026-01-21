// Main Scoundrel game component

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { DevTools } from './pages/DevTools';
import { Rules } from './pages/Rules';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameBoard />} />
        <Route path="/dev" element={<DevTools />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
