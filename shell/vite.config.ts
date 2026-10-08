import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import {federation} from "@module-federation/vite";
import mfConfig from './module-federation.config.ts';

// https://vite.dev/config/
export default defineConfig({
  server: { port: 4000, strictPort: true },
  preview: { port: 4000, strictPort: true },
  plugins: [react(), federation(mfConfig)],
})
