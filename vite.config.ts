import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'service-worker.js',
      registerType: 'autoUpdate',
      manifest: false, // We're using our own manifest.json
      injectRegister: false, // We're using our own registration
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@chakra-ui/react',
            '@emotion/react',
            '@emotion/styled',
            'framer-motion'
          ]
        }
      }
    },
  },
  server: {
    port: 5173,
    host: true,
  },
}) 