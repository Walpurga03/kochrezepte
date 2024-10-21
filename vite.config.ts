import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/kochrezepte/', // Setze den Basis-Pfad auf den Repository-Namen
  plugins: [react()],
});