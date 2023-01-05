import { Card, CardBody, CardHeader, Heading, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import CreateProduct from '../../../Components/home/Dashboard/Product/CreateProduct'
import Layout from '../../../Layouts/Home/Layout'

export default function add() {
  return (
    <Layout
      title='Add Product'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Add Product', link: '/home/products/add' }
      ]}
    >
      <Card shadow={'md'} bg='white' mt={4}>
        <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
          <Heading size='md'>Add new product</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <CreateProduct />
          </Stack>
        </CardBody>
      </Card>
    </Layout>
  )
}
