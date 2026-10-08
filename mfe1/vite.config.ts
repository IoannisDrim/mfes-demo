import react from '@vitejs/plugin-react'
import { defineConfig, type Connect, type Plugin } from 'vite'
import { federation } from "@module-federation/vite";
import mfConfig from './module-federation.config.ts';

const PUBLIC_URL = process.env.PUBLIC_URL ?? 'http://localhost:4001';

// Standalone only: the app's router runs under basename "/properties", so the
// server root has nothing to match. Send it to the mount path instead, in both
// dev and preview. Deployments do the same through vercel.json.
function redirectRootToMountPath(mountPath: string): Plugin {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url === '/') {
      res.writeHead(302, { Location: mountPath })
      res.end()
      return
    }
    next()
  }

  return {
    name: 'redirect-root-to-mount-path',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: PUBLIC_URL,
  server: { port: 4001, strictPort: true, origin: PUBLIC_URL },
  preview: { port: 4001, strictPort: true },
  plugins: [react(), federation(mfConfig), redirectRootToMountPath('/properties')],
})
