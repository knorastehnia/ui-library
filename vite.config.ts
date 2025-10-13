import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setupTests.ts'],
  },
})
