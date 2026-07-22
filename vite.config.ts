import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// one port per app — pick a unique one when cloning the template
const PORT = 3000

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: './dist',
  },
  preview: {
    port: PORT,
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    port: PORT,
    // uncomment when this app grows a backend:
    // proxy: {
    //   '/api': {
    //     target: process.env.VITE_BACKEND ?? 'http://localhost:3030',
    //     changeOrigin: true,
    //   },
    // },
  },
})
