import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {
  return (
    <Layout
      title='Product list'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Product List', link: '/home/products' }
      ]}
    >
      <div>Product list</div>
    </Layout>
  )
}
