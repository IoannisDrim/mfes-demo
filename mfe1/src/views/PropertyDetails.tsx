import { useParams } from 'react-router-dom'
import { getProperty } from '../properties.ts'
import styles from '../App.module.css'

function PropertyDetails() {
  const { propertyId } = useParams()
  const property = getProperty(propertyId)

  if (!property) {
    return null
  }

  return (
    <dl className={styles.details}>
      <dt>Address</dt>
      <dd>{property.address}</dd>
      <dt>Year built</dt>
      <dd>{property.yearBuilt}</dd>
      <dt>Floor area</dt>
      <dd>{property.floorArea}</dd>
    </dl>
  )
}

export default PropertyDetails
