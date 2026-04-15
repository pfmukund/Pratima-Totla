import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import os from 'node:os'

// Keep Vite's dep-optimizer cache outside of Dropbox/OneDrive to avoid file-lock
// stalls on Windows (native fs watches + cloud sync fight each other).
const CACHE_DIR = path.join(os.tmpdir(), 'vite-pratima-totla')

export default defineConfig({
  cacheDir: CACHE_DIR,
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE || '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-pageflip')) return 'pageflip'
          if (id.includes('lenis')) return 'lenis'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('scheduler')) return 'react-dom'
          if (id.includes('node_modules/react/')) return 'react'
          return 'vendor'
        },
      },
    },
  },
})
