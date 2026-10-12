import { useMemo } from 'react'
import App from './App.tsx'
import {
  fallbackNavigation,
  NavigationProvider,
  type Navigation,
} from './navigation.tsx'

// Host-facing entry point, exposed over Module Federation. It deliberately
// renders no Router: the host already owns one, and nesting a second would
// split navigation across two histories.
//
// Leaving mfe2 works the same way round. The host passes in how to reach a
// target and mfe2 puts it on a context of its own, so the views ask for it
// without the contract having to be threaded through every route.
function Mfe2Integrated({ navigateTo }: Partial<Navigation>) {
  const navigation = useMemo<Navigation>(
    () => ({ navigateTo: navigateTo ?? fallbackNavigation.navigateTo }),
    [navigateTo],
  )

  return (
    <NavigationProvider navigation={navigation}>
      <App />
    </NavigationProvider>
  )
}

export default Mfe2Integrated
