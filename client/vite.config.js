import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/productData': {
      target: 'https://next-gen-server.onrender.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/productData/, '/productData')
    }
  }
})
