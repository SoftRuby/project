import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/predict': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/models': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/labels': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
