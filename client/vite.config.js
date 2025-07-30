import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 7000,
    open: true,
  },

  resolve: {
    alias: {
      '@': '/src', // Ensure this points to the correct directory
    },
  },
})
