import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Cursor_Binded_3dPortfolio/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
})
