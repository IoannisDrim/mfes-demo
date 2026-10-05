export type Property = {
  id: string
  address: string
  yearBuilt: number
  floorArea: string
  hasParking: boolean
}

export const properties: Property[] = [
  {
    id: '1',
    address: '12 Ermou Street, Athens',
    yearBuilt: 1998,
    floorArea: '1,450 m²',
    hasParking: true,
  },
  {
    id: '2',
    address: '45 Tsimiski Avenue, Thessaloniki',
    yearBuilt: 2007,
    floorArea: '820 m²',
    hasParking: false,
  },
  {
    id: '3',
    address: '8 Akti Miaouli, Piraeus',
    yearBuilt: 1975,
    floorArea: '3,100 m²',
    hasParking: true,
  },
]

export function getProperty(id: string | undefined): Property | undefined {
  return properties.find((property) => property.id === id)
}
