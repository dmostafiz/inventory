import React from 'react'
import CreateBrandModal from '../../../Components/home/Dashboard/FormModals/CreateBrandModal'
import Layout from '../../../Layouts/Home/Layout'

export default function brands() {
  return (
    <Layout
      title='Brands'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Brands', link: '/home/products/brands' }
      ]}
      titleRight={<CreateBrandModal />}
    >
      <div>brands</div>
    </Layout>
  )
}
