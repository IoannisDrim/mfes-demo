import { Link } from 'react-router-dom'
import { Table } from '@mfes-demo/ui-lib'
import { properties } from '../properties.ts'
import styles from '../App.module.css'

function Properties() {
  return (
    <section>
      <h2 className={styles.title}>Properties</h2>
      <Table
        rows={properties}
        rowKey={(property) => property.id}
        columns={[
          { header: 'ID', cell: (property) => property.id },
          {
            header: 'Address',
            cell: (property, { linkClassName }) => (
              <Link to={property.id} className={linkClassName}>
                {property.address}
              </Link>
            ),
          },
        ]}
      />
    </section>
  )
}

export default Properties
