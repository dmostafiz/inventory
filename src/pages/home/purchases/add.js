import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function add() {
  return (
    <Layout
      title='Add purchase'
      breads={[
        { title: 'Purchases', link: '/home/purchases' },
        { title: 'Add Purchase', link: '/home/purchases/add' }
      ]}
    >
      <div>add purchase</div>
    </Layout>
  )
}
