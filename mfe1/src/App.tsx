import { Navigate, Route, Routes } from 'react-router-dom'
import ParkingDetails from './views/ParkingDetails.tsx'
import Properties from './views/Properties.tsx'
import Property from './views/Property.tsx'
import PropertyDetails from './views/PropertyDetails.tsx'
import styles from './App.module.css'

// Paths are relative so mfe1 never assumes its own mount point: the host
// decides where it lives, and standalone dev supplies a basename instead.
function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route index element={<Properties />} />
        <Route path=":propertyId" element={<Property />}>
          <Route index element={<Navigate to="details" replace />} />
          <Route path="details" element={<PropertyDetails />} />
          <Route path="parking" element={<ParkingDetails />} />
        </Route>
        <Route path="*" element={<Navigate to=".." replace />} />
      </Routes>
    </div>
  )
}

export default App
