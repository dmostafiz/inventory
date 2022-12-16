import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {
  return (
    <Layout
      title='Purchases list'
      breads={[
        { title: 'Purchases', link: '/home/purchases' },
        { title: 'Purchases list', link: '/home/purchases' }
      ]}
    >
      <div>purchases list</div>
    </Layout>
  )
}
