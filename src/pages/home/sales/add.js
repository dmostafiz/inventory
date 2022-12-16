import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function add() {
  return (
    <Layout
      title='Add Sale'
      breads={[
        { title: 'Sales', link: '/home/sales' },
        { title: 'Add Sale', link: '/home/sales/add' }
      ]}
    >
      <div>add sale</div>
    </Layout>
  )
}
