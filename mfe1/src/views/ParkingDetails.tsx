import { useParams } from 'react-router-dom'
import { getProperty } from '../properties.ts'
import styles from '../App.module.css'

function ParkingDetails() {
  const { propertyId } = useParams()
  const property = getProperty(propertyId)

  if (!property) {
    return null
  }

  return (
    <dl className={styles.details}>
      <dt>Parking</dt>
      <dd>{property.hasParking ? 'Yes' : 'No'}</dd>
    </dl>
  )
}

export default ParkingDetails
