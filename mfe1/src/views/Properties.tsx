import { Link } from 'react-router-dom'
import { properties } from '../properties.ts'
import styles from '../App.module.css'

function Properties() {
  return (
    <section>
      <h2 className={styles.title}>Properties</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className={styles.row}>
              <td>{property.id}</td>
              <td>
                <Link to={property.id} className={styles.rowLink}>
                  {property.address}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Properties
