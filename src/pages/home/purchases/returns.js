import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function returns() {
  return (
    <Layout
      title='Purchase Returns'
      breads={[
        { title: 'Purchases', link: '/home/purchases' },
        { title: 'Purchase returns', link: '/home/purchases/returns' }
      ]}
    >
      <div>purchase returns</div>
    </Layout>
  )
}
