import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path for production: when deploying to a custom domain, this should be '/'.
// For GitHub Pages project sites (e.g. pfmukund.github.io/Pratima-Totla/), it
// must be '/Pratima-Totla/'. We choose via env var so dev + Pages + custom
// domain all work without manual editing.
//   VITE_BASE=/Pratima-Totla/  (CI for GitHub Pages)
//   VITE_BASE=/                (custom domain)
//   (unset)                    (dev → '/')
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE || '/',
})
