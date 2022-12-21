import React from 'react'
import CreateVariationModal from '../../../Components/home/Dashboard/FormModals/CreateVariationModal'
import Layout from '../../../Layouts/Home/Layout'

export default function variations() {
  return (
    <Layout
      title='Variations'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Variations', link: '/home/products/variations' }
      ]}
      titleRight={<CreateVariationModal />}
    >
      <div>variations</div>
    </Layout>
  )
}
