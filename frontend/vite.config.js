// Vite build tool config — handles bundling, dev server, hot reload
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // frontend runs here — backend (Express) will run on 5000
  },
})
