import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { federation } from "@module-federation/vite";
import mfConfig from './module-federation.config.ts';

const PUBLIC_URL = process.env.PUBLIC_URL ?? 'http://localhost:5001';

// Standalone dev only: the app's router runs under basename "/properties", so
// the server root has nothing to match. Send it to the mount path instead.
function redirectRootToMountPath(mountPath: string): Plugin {
  return {
    name: 'redirect-root-to-mount-path',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/') {
          res.writeHead(302, { Location: mountPath })
          res.end()
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: PUBLIC_URL,
  server: { port: 5001, strictPort: true, origin: PUBLIC_URL },
  preview: { port: 5001, strictPort: true },
  plugins: [react(), federation(mfConfig), redirectRootToMountPath('/properties')],
})
