import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://apistf.suoitien.vn',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: true, // Đảm bảo HMR bật
  },
  base: './', // Đảm bảo đường dẫn tương đối
  build: {
    outDir: "dist", // Đảm bảo đúng thư mục output
  emptyOutDir: true, // Xóa thư mục cũ trước khi build
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
