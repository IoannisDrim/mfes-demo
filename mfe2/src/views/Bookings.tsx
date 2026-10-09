import { Link } from 'react-router-dom'
import { Table } from '@mfes-demo/ui-lib'
import { bookings } from '../bookings.ts'
import styles from '../App.module.css'

function Bookings() {
  return (
    <section>
      <h2 className={styles.title}>Bookings</h2>
      <Table
        rows={bookings}
        rowKey={(booking) => booking.id}
        columns={[
          { header: 'ID', cell: (booking) => booking.id },
          {
            header: 'Property',
            cell: (booking, { linkClassName }) => (
              <Link to={booking.id} className={linkClassName}>
                {booking.propertyAddress}
              </Link>
            ),
          },
        ]}
      />
    </section>
  )
}

export default Bookings
