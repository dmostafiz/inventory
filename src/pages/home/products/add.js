import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function add() {
  return (
    <Layout
      title='Add Products'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Add Product', link: '/home/products/add' }
      ]}
    >
      <div>product add</div>
    </Layout>
  )
}
