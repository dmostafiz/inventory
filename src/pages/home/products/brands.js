import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function brands() {
  return (
    <Layout
      title='Brands'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Brands', link: '/home/products/brands' }
      ]}
    >
      <div>brands</div>
    </Layout>
  )
}
