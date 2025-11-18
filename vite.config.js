import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  build: {
    rollupOptions: { input: './index.html' },
    minify: false,
    cssMinify: true,
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html', './src/**/*.css']),
  ],
});