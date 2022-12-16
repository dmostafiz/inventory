import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {
    return (
        <Layout
            title='Sales List'
            breads={[
                { title: 'Sales', link: '/home/sales' },
                { title: 'Sales List', link: '/home/sales' }
            ]}
        >
            <div>Sales List</div>
        </Layout>
    )
}
