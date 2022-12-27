import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateSupplier from '../../../Components/home/Dashboard/FormModals/CreateSupplier'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function suplliers() {

  const { deleteAction } = useAppActions()

  const { data, isLoading, error } = useQuery(['getSuppliers'], async () => {
    const res = await Axios.get('/supplier')

    console.log('suppliers loaded', res.data)

    return res.data
  })

  return (
    <Layout
      title='Suppliers'
      titleRight={<CreateSupplier />}
      breads={[
        { title: 'Contacts', link: '#' },
        { title: 'Suppliers', link: '/home/contacts/suppliers' }
      ]}
    >


      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Suppliers list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.suppliers?.length > 0 && <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Contact</Th>
                    <Th>Address</Th>
                    <Th>Purchased</Th>
                    <Th>Description</Th>
                    <Th>Created</Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.suppliers?.map((supplier, index) => {
                    return <Tr key={index}>
                      <Td>
                        <Text mb={2}><strong>Name</strong> - {supplier.prefix}. {supplier.firstName} {supplier.middleName} {supplier.lastName}</Text>
                        <Text><strong>Mobile</strong> - {supplier.mobile}</Text>
                        <Text><strong>Alternative</strong> - {supplier.alternativeMobile}</Text>
                        <Text><strong>Land Line</strong> - {supplier.landLine}</Text>
                        <Text><strong>Email</strong> - {supplier.email}</Text>
                      </Td>
                      <Td>
                        <Text>{supplier.addressOne}.</Text>
                        <Text>{supplier.addressTwo}</Text>
                        <Text mt={2}><strong>City</strong> - {supplier.city}</Text>
                        <Text><strong>State</strong> - {supplier.state}</Text>
                        <Text><strong>Country</strong> - {supplier.country}</Text>
                        <Text><strong>zip code</strong> - {supplier.zipCode}</Text>
                      </Td>
                      <Td>
                        <Text><strong>Total</strong> - {0} products</Text>
                        <Text><strong>Paid</strong> - {0}</Text>
                        <Text><strong>Due</strong> - {0}</Text>
                      </Td>
                      <Td whiteSpace='break-spaces'>{supplier.description}</Td>
                      <Td>{moment(supplier.createdAt).format('LL')}</Td>
                      <Td isNumeric>
                        <Button size={'sm'} colorScheme='teal'>Edit</Button>
                        <Button
                          onClick={() => deleteAction({
                            id: supplier.id,
                            url: '/supplier/delete',
                            refetchKies: ['getSuppliers']
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

              {!isLoading && !data?.suppliers?.length && <DataNotFound />}

            </TableContainer>
          </CardBody>
        </Card>
      </Box>

    </Layout>
  )
}
