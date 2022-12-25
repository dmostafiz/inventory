import { Box, Button, Card, CardBody, CardHeader, Center, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateBrandModal from '../../../Components/home/Dashboard/FormModals/CreateBrandModal'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function brands() {

  const { data, error, isLoading } = useQuery(['getBrands'], async () => {
    const res = await Axios('/brand/get')
    console.log('Load brands', res)
    return res?.data
  })

  const { deleteAction } = useAppActions()

  return (
    <Layout
      title='Brands'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Brands', link: '/home/products/brands' }
      ]}
      titleRight={<CreateBrandModal />}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Brand list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.brands?.length > 0 && <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Brand Name</Th>
                    <Th>Description</Th>
                    <Th>Products Count</Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.brands?.map((brand, index) => {
                    return <Tr key={index}>
                      <Td>{brand.name}</Td>
                      <Td>{brand.description}</Td>
                      <Td>0 products</Td>
                      <Td isNumeric>
                        <Button size={'sm'} colorScheme='teal'>Edit</Button>
                        <Button
                          onClick={() => deleteAction({
                            id: brand.id,
                            url: '/brand/delete',
                            refetchKies: ['getBrands']
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

              {!isLoading && !data?.brands?.length && <DataNotFound />}

            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
