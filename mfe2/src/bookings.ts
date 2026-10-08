export type Booking = {
  id: string
  propertyId: string
  propertyAddress: string
  checkIn: string
  checkOut: string
  guest: string
}

// The property address is stored on the booking rather than looked up from
// mfe1: a remote that owns its own data stays deployable on its own.
export const bookings: Booking[] = [
  {
    id: '1',
    propertyId: '1',
    propertyAddress: '12 Ermou Street, Athens',
    checkIn: '12 Mar 2026',
    checkOut: '19 Mar 2026',
    guest: 'Maria Pappas',
  },
  {
    id: '2',
    propertyId: '2',
    propertyAddress: '45 Tsimiski Avenue, Thessaloniki',
    checkIn: '03 Apr 2026',
    checkOut: '10 Apr 2026',
    guest: 'Nikos Alexiou',
  },
  {
    id: '3',
    propertyId: '3',
    propertyAddress: '8 Akti Miaouli, Piraeus',
    checkIn: '21 Apr 2026',
    checkOut: '05 May 2026',
    guest: 'Elena Dimitriou',
  },
]

export function getBooking(id: string | undefined): Booking | undefined {
  return bookings.find((booking) => booking.id === id)
}
