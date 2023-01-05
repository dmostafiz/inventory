import { Card, CardBody, CardHeader, Heading, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import CreateSale from '../../../Components/home/Dashboard/Sale/CreateSale'
import Layout from '../../../Layouts/Home/Layout'

export default function add() {
  return (
    <Layout
      title='Add Sales'
      breads={[
        { title: 'Sales', link: '/home/sales' },
        { title: 'Add Sale', link: '/home/sales/add' }
      ]}
    >
      <Card shadow={'md'} bg='white' mt={4}>
        <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
          <Heading size='md'>Add new sale</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <CreateSale />
          </Stack>
        </CardBody>
      </Card>
    </Layout>
  )
}
