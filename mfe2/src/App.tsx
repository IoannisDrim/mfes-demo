import { Navigate, Route, Routes } from 'react-router-dom'
import { useTheme } from '@mfes-demo/ui-lib'
import Booking from './views/Booking.tsx'
import Bookings from './views/Bookings.tsx'
import styles from './App.module.css'

// Paths are relative so mfe2 never assumes its own mount point: the host
// decides where it lives, and standalone dev supplies a basename instead.
//
// The theme is applied the same way round: mfe2 reads the shared context and
// themes its own root, rather than the host restyling it from the outside. A
// host that provides no theme leaves it on the context default.
function App() {
  const { name: theme } = useTheme()

  return (
    <div className={styles.app} data-theme={theme}>
      <Routes>
        <Route index element={<Bookings />} />
        <Route path=":bookingId" element={<Booking />} />
        <Route path="*" element={<Navigate to=".." replace />} />
      </Routes>
    </div>
  )
}

export default App
