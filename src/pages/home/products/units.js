import React from 'react'
import CreateUnitModal from '../../../Components/home/Dashboard/FormModals/CreateUnitModal'
import Layout from '../../../Layouts/Home/Layout'

export default function units() {
  return (
    <Layout
      title='Units'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Units', link: '/home/products/units' }
      ]}
      titleRight={<CreateUnitModal />}
    >
      <div>units</div>
    </Layout>
  )
}
