import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Ensures correct relative paths
  server: {
    historyApiFallback: true, // ✅ Fix for React Router nested routes
  },
});
