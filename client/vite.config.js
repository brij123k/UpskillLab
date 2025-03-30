import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      clientPort: 443, // Ensures HMR works with ngrok's HTTPS tunnel
    },
    allowedHosts: [
      '2f8a-2409-40d0-1348-81c1-b0fa-a743-67eb-11bb.ngrok-free.app', // Specific ngrok host
      'https://1993-2409-40d0-1348-81c1-2df4-f09d-6889-9a3c.ngrok-free.app',
      '.ngrok-free.app', // Wildcard for all ngrok-free.app subdomains
    ],
  },
  build: {
    outDir: 'dist', // Ensures Render can find the build output
  },
  base: '/', // Ensures correct relative paths
  resolve: {
    alias: {
      '@': '/src', // Optional: Shortcut for imports
    },
  },
  server: {
    historyApiFallback: true, // ✅ Fix for React Router nested routes
  },
});