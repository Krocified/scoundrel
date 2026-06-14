// Main Scoundrel game component

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { DevTools } from './pages/DevTools';
import { Rules } from './pages/Rules';
import { DeckCustomizationProvider } from './contexts/DeckCustomizationContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <DeckCustomizationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GameBoard />} />
            <Route path="/dev" element={<DevTools />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </BrowserRouter>
      </DeckCustomizationProvider>
    </ThemeProvider>
  );
}

export default App;
