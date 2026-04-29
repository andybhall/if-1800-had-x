import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // If deploying to a subpath (e.g. github pages: yourname.github.io/if-1800-had-x/),
  // change `base` to '/if-1800-had-x/'. For root domains, leave as '/'.
  base: '/',
});
