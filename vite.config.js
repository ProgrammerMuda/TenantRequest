import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh for instant state-preserving updates without full reload
      fastRefresh: true,
    })
  ],
  server: {
    port: 3000,
    host: true, // Enables local network & localhost access
    open: true,
    hmr: {
      overlay: true, // Shows error overlays in browser during dev
    }
  }
});
