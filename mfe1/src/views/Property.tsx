import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { getProperty } from '../properties.ts'
import styles from '../App.module.css'

function BackLink() {
  return (
    <Link to=".." className={styles.back}>
      <span className={styles.backIcon} aria-hidden="true">
        ‹
      </span>
      Back
    </Link>
  )
}

function menuItem({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
}

function Property() {
  const { propertyId } = useParams()
  const property = getProperty(propertyId)

  if (!property) {
    return (
      <section>
        <BackLink />
        <p>Property not found.</p>
      </section>
    )
  }

  return (
    <section>
      <BackLink />
      <h2 className={styles.title}>{property.address}</h2>
      <nav className={styles.menu}>
        <NavLink to="details" className={menuItem}>
          Details
        </NavLink>
        <NavLink to="parking" className={menuItem}>
          Parking
        </NavLink>
      </nav>
      <Outlet />
    </section>
  )
}

export default Property
