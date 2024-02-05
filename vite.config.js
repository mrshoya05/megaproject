import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   // other configurations...
  optimizeDeps: {
    include: ['@tinymce/tinymce-react'],
    exclude: ['@tinymce/tinymce-react'],
  },
})

