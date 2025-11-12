import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          antd: ['antd', '@ant-design/icons'],
          i18n: ['i18next', 'react-i18next'],
          utils: ['axios', 'dayjs', 'react-toastify'],
        },
      },
    },
  },
  server: {
    port: 2432,
    proxy: {
      '/api': {
        target: 'https://api-dev.docnova.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            proxyReq.removeHeader('Origin');
          });
        },
      },
    },
  },
})