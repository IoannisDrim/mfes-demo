import { Link, useParams } from 'react-router-dom'
import { getBooking } from '../bookings.ts'
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

function Booking() {
  const { bookingId } = useParams()
  const booking = getBooking(bookingId)

  if (!booking) {
    return (
      <section>
        <BackLink />
        <p>Booking not found.</p>
      </section>
    )
  }

  return (
    <section>
      <BackLink />
      <h2 className={styles.title}>Booking {booking.id}</h2>
      <dl className={styles.details}>
        <dt>Property</dt>
        <dd>{booking.propertyAddress}</dd>
        <dt>Check-in</dt>
        <dd>{booking.checkIn}</dd>
        <dt>Check-out</dt>
        <dd>{booking.checkOut}</dd>
        <dt>Guest</dt>
        <dd>{booking.guest}</dd>
      </dl>
    </section>
  )
}

export default Booking
