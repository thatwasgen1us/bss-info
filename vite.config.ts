import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/top_rate': {
        target: 'http://10.77.28.213:8000',
        changeOrigin: true,
        secure: false,
      },
      '/site_info': {
        target: 'http://10.77.28.213:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
