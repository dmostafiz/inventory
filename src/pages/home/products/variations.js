import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function variations() {
  return (
    <Layout
      title='Variations'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Variations', link: '/home/products/variations' }
      ]}
    >
      <div>variations</div>
    </Layout>
  )
}
