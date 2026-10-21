import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import ui from '@fisherrjd/ui/vite'

// one port per app — pick a unique one when cloning the template
const PORT = 3000

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    // Jade's theme for this app: palette (or your own 4 colors), fonts,
    // style (line | block | hud), radius. Find a look in /styleguide's theme
    // lab and paste its config here, e.g.
    //   ui({ palette: 'gold', fonts: { heading: 'Cinzel' }, style: 'hud', radius: 0 })
    ui(),
  ],
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
