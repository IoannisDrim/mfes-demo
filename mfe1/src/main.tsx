import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mfes-demo/ui-lib'
import '@mfes-demo/ui-lib/styles.css'
import App from './App.tsx'

// Standalone entry point only. The basename stands in for the mount path the
// shell provides when mfe1 runs as a remote, and the ThemeProvider stands in for
// the one the shell owns. Both belong to the host, so neither appears in the
// exposed entry point: nesting a second provider there would give the remote a
// theme the rest of the page does not share.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename="/properties">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
