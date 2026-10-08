import { Link } from 'react-router-dom'
import { bookings } from '../bookings.ts'
import styles from '../App.module.css'

function Bookings() {
  return (
    <section>
      <h2 className={styles.title}>Bookings</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Property</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className={styles.row}>
              <td>{booking.id}</td>
              <td>
                <Link to={booking.id} className={styles.rowLink}>
                  {booking.propertyAddress}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Bookings
