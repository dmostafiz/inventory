import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function list() {
    return (
        <Layout
            title='Pos List'
            breads={[
                { title: 'Pos', link: '/home/pos' },
                { title: 'Pos List', link: '/home/pos/list' }
            ]}
        >
            <div>pos list</div>
        </Layout>
    )
}
