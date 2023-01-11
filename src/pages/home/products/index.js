import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {

  const { deleteAction } = useAppActions()

  const { data, isLoading, error } = useQuery(['getProducts'], async () => {
    const res = await Axios.get('/product')

    console.log('products loaded', res.data)

    return res.data
  })


  return (
    <Layout
      title='Product list'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Product List', link: '/home/products' }
      ]}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>product list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.products?.length > 0 && <Table size='sm' variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Product Name</Th>
                    <Th>SKU</Th>
                    <Th>Stock</Th>
                    <Th>Unit</Th>
                    <Th>Category</Th>
                    <Th>Brand</Th>
                    <Th>Rack No</Th>
                    <Th>Row</Th>
                    <Th>Column</Th>
                    <Th>Description</Th>
                    <Th>Applicable Tax</Th>
                    <Th>Purchase Price</Th>
                    <Th>Profit Margin (%)</Th>
                    <Th>Selling Price (Exc Tax)</Th>
                    <Th>Selling Price (Inc Tax)</Th>
                    <Th>Created</Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.products?.map((product, index) => {
                    return <Tr key={index} bg={product.stock <= product.alertQuantity && 'red.100'}>
                      <Td>{product.name}</Td>
                      <Td>{product.sku}</Td>
                      <Td>{product.stock}</Td>
                      <Td>{product.unitValue} {product.unit?.name}</Td>
                      <Td>{product.category?.name}</Td>
                      <Td>{product.brand?.name}</Td>
                      <Td>{product.rackNo || '_'}</Td>
                      <Td>{product.row || '_'}</Td>
                      <Td>{product.column || '_'}</Td>
                      <Td>{product.description}</Td>
                      <Td>{product.tax?.name} ({product.taxRate}%)</Td>
                      <Td>{product.purchasePrice}</Td>
                      <Td>{product.profitMargin}%</Td>
                      <Td>{product.sellingPriceExcTax}</Td>
                      <Td>{product.sellingPriceIncTax}</Td>
                      <Td>{moment(product.createdAt).format('LL')}</Td>
                      <Td isNumeric>
                        <Button size={'sm'} colorScheme='teal'>Edit</Button>
                        <Button
                          onClick={() => deleteAction({
                            id: product.id,
                            url: '/product/delete',
                            refetchKies: ['getproducts']
                          })}
                          size={'sm'}
                          colorScheme='red'
                          ml={2}>
                          Delete
                        </Button>
                      </Td>
                    </Tr>

                  })}

                </Tbody>
              </Table>}

              {!isLoading && !data?.products?.length && <DataNotFound />}

            </TableContainer>

          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
