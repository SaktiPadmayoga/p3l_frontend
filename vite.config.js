import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
import 'tailwind-scrollbar-hide'

export default defineConfig({
  plugins: [react()]
});
