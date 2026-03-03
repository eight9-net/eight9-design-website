import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevtools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.gif', '**/*.webp', '**/*.avif'],
  plugins: [
    vue(),
    tailwindcss(),
    vueDevtools(),
  ],
  server: {
    port: 5027,
    host: '0.0.0.0',
    hot: true,
  },
})
