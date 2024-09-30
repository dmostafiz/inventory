import { Card, CardBody, CardHeader, Heading, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import CreateProduct from '../../../Components/home/Dashboard/Product/CreateProduct'
import Layout from '../../../Layouts/Home/Layout'
import {useRouter} from "next/router";

export default function add() {

  const router = useRouter()

  return (
    <Layout
      title={router?.query?.productId ? 'Update Product' : 'Add Product'}
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: router?.query?.productId ? 'Update Product' : 'Add Product', link: '/home/products/add' }
      ]}
    >
      <Card shadow={'md'} bg='white' mt={4}>
        <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
          <Heading size='md'>{router?.query?.productId ? 'Update Product' :  'Add new product'}</Heading>
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
