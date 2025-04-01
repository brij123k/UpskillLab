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
      '3695-2409-40d0-13a1-4362-2c98-9dbb-40e9-e27c.ngrok-free.app', // Specific ngrok host
      'https://1993-2409-40d0-1348-81c1-2df4-f09d-6889-9a3c.ngrok-free.app',
      '.ngrok-free.app', // Wildcard for all ngrok-free.app subdomains
    ],
  },
});