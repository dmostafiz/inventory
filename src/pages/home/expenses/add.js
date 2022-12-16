import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function add() {
    return (
        <Layout
            title='Add Expenses'
            breads={[
                { title: 'Expenses', link: '/home/expenses' },
                { title: 'Add Expense', link: '/home/expenses/add' }
            ]}
        >
            <div>add expenses</div>
        </Layout>
    )
}
