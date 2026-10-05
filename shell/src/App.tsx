import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import {Mfe1View} from "./views/Mfe1.tsx";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>mfes-demo</h1>
      </header>
      <div className="body">
        <aside className="sidebar">
          <nav className="menu">
            <NavLink to="/properties">
              <span className="menuIcon" aria-hidden="true">
                ⌂
              </span>
              Properties
            </NavLink>
          </nav>
        </aside>
        <main className="content">
          <Routes>
            <Route path="/properties/*" element={<Mfe1View />} />
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
