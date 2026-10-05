import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

// Standalone entry point only. The basename stands in for the mount path the
// shell provides when mfe1 runs as a remote.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/properties">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
