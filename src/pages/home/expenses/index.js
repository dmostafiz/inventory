import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {
  return (
    <Layout
      title='Expenses List'
      breads={[
        { title: 'Expenses', link: '/home/expenses' },
        { title: 'Expense List', link: '/home/expenses' }
      ]}
    >
      <div>List Expenses</div>
    </Layout>
  )
}
