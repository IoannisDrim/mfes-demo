import { Navigate, Route, Routes } from 'react-router-dom'
import Booking from './views/Booking.tsx'
import Bookings from './views/Bookings.tsx'
import styles from './App.module.css'

// Paths are relative so mfe2 never assumes its own mount point: the host
// decides where it lives, and standalone dev supplies a basename instead.
function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route index element={<Bookings />} />
        <Route path=":bookingId" element={<Booking />} />
        <Route path="*" element={<Navigate to=".." replace />} />
      </Routes>
    </div>
  )
}

export default App
