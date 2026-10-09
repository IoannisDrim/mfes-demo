import { Navigate, Route, Routes } from 'react-router-dom'
import { useTheme } from '@mfes-demo/ui-lib'
import ParkingDetails from './views/ParkingDetails.tsx'
import Properties from './views/Properties.tsx'
import Property from './views/Property.tsx'
import PropertyDetails from './views/PropertyDetails.tsx'
import styles from './App.module.css'

// Paths are relative so mfe1 never assumes its own mount point: the host
// decides where it lives, and standalone dev supplies a basename instead.
//
// The theme is applied the same way round: mfe1 reads the shared context and
// themes its own root, rather than the host restyling it from the outside. A
// host that provides no theme leaves it on the context default.
function App() {
  const { name: theme } = useTheme()

  return (
    <div className={styles.app} data-theme={theme}>
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
