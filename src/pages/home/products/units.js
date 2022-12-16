import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function units() {
  return (
    <Layout
      title='Units'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Units', link: '/home/products/units' }
      ]}
    >
      <div>units</div>
    </Layout>
  )
}
