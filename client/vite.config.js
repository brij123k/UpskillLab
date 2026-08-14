import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve(__dirname, 'prerender.jsx'),
      additionalPrerenderRoutes: [
        '/', '/landing', '/landing-bootcamp', '/thank-you', '/success-stories',
        '/upcoming-batches', '/blog', '/ebooks', '/newsletter', '/self-test',
        '/contactus', '/courselist', '/career', '/whyus', '/about',
        '/PCATExamPortal', '/PCAT/result', '/register', '/login',
        '/forgetPassword', '/ResetPassword', '/VerifyOTP', '/TermsOfService',
        '/privacypolicy', '/refundpolicy', '/teacher/register',
      ],
    }),
  ],

  server: {
    allowedHosts: ['56dd-111-223-30-6.ngrok-free.app'],
  },
});