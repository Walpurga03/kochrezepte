import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/main.scss'; // Neue Zeile: SCSS-Datei importieren

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/kochrezepte">
      <App />
    </BrowserRouter>
  </StrictMode>,
);