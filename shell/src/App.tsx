import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import {Mfe1View} from "./views/Mfe1.tsx";
import {Mfe2View} from "./views/Mfe2.tsx";
import { useTheme } from '@mfes-demo/ui-lib'
import ThemeSwitch from './ThemeSwitch.tsx'

function App() {
  const { name: theme } = useTheme()

  // The host themes its own chrome from the same context the remotes read, so
  // nothing on the page is restyled by a side effect on the document.
  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <h1>mfes-demo</h1>
        <ThemeSwitch />
      </header>
      <div className="body">
        <aside className="sidebar">
          <nav className="menu">
            <NavLink to="/properties">
              <span className="menuIcon" aria-hidden="true">
                🏠
              </span>
              Properties
            </NavLink>
            <NavLink to="/bookings">
              <span className="menuIcon" aria-hidden="true">
                🗓
              </span>
              Bookings
            </NavLink>
          </nav>
        </aside>
        <main className="content">
          <Routes>
            <Route path="/properties/*" element={<Mfe1View />} />
            <Route path="/bookings/*" element={<Mfe2View />} />
            <Route
              path="*"
              element={<Navigate to="/properties" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
