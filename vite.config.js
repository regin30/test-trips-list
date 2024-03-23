import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from '@svgr/rollup'

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  server: {
    proxy: {
      '/transnextgen': {
        target: 'https://transstage1.iwayex.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/transnextgen/, ''),
        secure: false
      }
    }
  },
})
