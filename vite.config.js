import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  base: '/tacticalpro-gear-store/', // CRITICAL: This forces Vite to resolve file routes inside your GitHub folder path
})
