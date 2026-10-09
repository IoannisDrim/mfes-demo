import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ThemeName = 'light' | 'dark'

export type Theme = {
  name: ThemeName
  setTheme: (name: ThemeName) => void
  toggleTheme: () => void
}

// The default is what a consumer sees when no provider is above it. Keeping it
// usable rather than throwing matters here: a remote rendered by a host that
// forgot the provider should still paint, just without a working switch.
const ThemeContext = createContext<Theme>({
  name: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

// Holds the selected theme and nothing else. It deliberately does not touch the
// document: an app applies the theme to its own root by putting the name in a
// data-theme attribute, so every app on the page opts in for itself instead of
// being restyled by a side effect it cannot see.
export function ThemeProvider({
  children,
  initialTheme = 'light',
}: {
  children: ReactNode
  initialTheme?: ThemeName
}) {
  const [name, setTheme] = useState<ThemeName>(initialTheme)

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(
    () => ({ name, setTheme, toggleTheme }),
    [name, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
  return useContext(ThemeContext)
}
