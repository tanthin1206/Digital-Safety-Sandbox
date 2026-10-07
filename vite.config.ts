import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' để chạy được trên GitHub Pages dù tên repo là gì
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
