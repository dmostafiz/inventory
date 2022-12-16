import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function categories() {
  return (
    <Layout
      title='Categories'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Categories', link: '/home/products/categories' }
      ]}
    >
      <div>categories</div>
    </Layout>
  )
}
