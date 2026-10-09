import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mfes-demo/ui-lib'
import '@mfes-demo/ui-lib/styles.css'
import App from './App.tsx'

// The host owns the theme state for the page, but it is shared rather than
// imposed: the provider only holds the value, and each app - this one and both
// remotes - reads it and themes its own root. Sharing the design system as a
// singleton is what puts the remotes on this provider rather than on one of
// their own.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
