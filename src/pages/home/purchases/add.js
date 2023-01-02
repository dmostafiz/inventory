import { Card, CardBody, CardHeader, Heading, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import CreatePurchase from '../../../Components/home/Dashboard/Purchase/CreatePurchase'
import Layout from '../../../Layouts/Home/Layout'

export default function add() {
  return (
    <Layout
      title='Add purchase'
      breads={[
        { title: 'Purchases', link: '/home/purchases' },
        { title: 'Add Purchase', link: '/home/purchases/add' }
      ]}
    >
      <Card shadow={'md'} bg='white' mt={4}>
        <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
          <Heading size='md'>Add new purchase</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <CreatePurchase />
          </Stack>
        </CardBody>
      </Card>
    </Layout>
  )
}
