import { createContext, useContext, type ReactNode } from 'react'

// What mfe2 can ask a host to navigate to. A target names a resource, never a
// path: mfe2 knows a booking refers to a property, but not where properties
// live. The host owns that mapping, so mfe1 can be mounted somewhere else
// without mfe2 changing.
export type NavigationTarget = { type: 'property'; id: string }

// Navigating is the host's job, not a path mfe2 is handed and renders. That
// keeps mfe2 clear of the host's router and its URLs entirely: it says where it
// wants to go, and something above it decides how.
export type Navigation = {
  navigateTo: (target: NavigationTarget) => void
}

// Used when nothing provides the contract, which is the normal case standalone.
// The link still renders, it just has nowhere to go; the warning explains why
// rather than leaving a host author guessing.
export const fallbackNavigation: Navigation = {
  navigateTo: (target) => {
    if (import.meta.env.DEV) {
      console.warn(
        `[mfe2] no host navigation provided, ignoring ${target.type}/${target.id}`,
      )
    }
  },
}

const NavigationContext = createContext<Navigation>(fallbackNavigation)

export function NavigationProvider({
  children,
  navigation,
}: {
  children: ReactNode
  navigation: Navigation
}) {
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation(): Navigation {
  return useContext(NavigationContext)
}
