import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), svgr()],
  // need to include when installing dep from 'file:../synbionet-api-js'
  // optimizeDeps: {
  //   include: ['@synbionet/api'],
  // },
})
