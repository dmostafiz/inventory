import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function returns() {
    return (
        <Layout
            title='Sales returns'
            breads={[
                { title: 'Sales', link: '/home/sales' },
                { title: 'Sale returns', link: '/home/returns' }
            ]}
        >
            <div>Sales returns</div>
        </Layout>
    )
}
