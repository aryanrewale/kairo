import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    cors: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5005',
        changeOrigin: true,
      },
    },
    hmr: {
      clientPort: 443,
    },
    // allow e2b preview hosts
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
  },
})
