import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import React from 'react'
import CreateExpense from '../../../Components/home/Dashboard/Expense/CreateExpense'
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

            <Card shadow={'md'} bg='white' mt={4}>
                <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                    <Heading size='md'>Add new expense</Heading>
                </CardHeader>
                <CardBody>
                    <CreateExpense />
                </CardBody>
            </Card>

        </Layout>
    )
}
