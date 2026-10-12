import { Link, useParams } from 'react-router-dom'
import { getBooking } from '../bookings.ts'
import { useNavigation } from '../navigation.tsx'
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

// A link out of mfe2 and into whichever app owns properties. It carries no
// href, because mfe2 is never told the target's URL: it names the resource and
// the host decides how to get there, so the click handler is the whole
// mechanism. Standalone there is no host, and the click is a no-op.
function PropertyLink({ id, children }: { id: string; children: string }) {
  const { navigateTo } = useNavigation()

  return (
    <a
      className={styles.crossLink}
      onClick={() => navigateTo({ type: 'property', id })}
    >
      {children}
    </a>
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
        <dd>
          <PropertyLink id={booking.propertyId}>
            {booking.propertyAddress}
          </PropertyLink>
        </dd>
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
