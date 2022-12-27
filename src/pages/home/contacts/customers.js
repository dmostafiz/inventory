import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateCustomer from '../../../Components/home/Dashboard/FormModals/CreateCustomer'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function customers() {

  const { deleteAction } = useAppActions()

  const { data, isLoading, error } = useQuery(['getCustomers'], async () => {
    const res = await Axios.get('/customer')

    console.log('customers loaded', res.data)

    return res.data
  })


  return (
    <Layout
      title={'Customers'}
      titleRight={<CreateCustomer />}
      breads={[
        { title: 'Contacts', link: '#' },
        { title: 'Customers', link: '/home/contacts/customers' }
      ]}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Customer list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.customers?.length > 0 && <Table size='sm' variant='striped'>
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
                  {data?.customers?.map((customer, index) => {
                    return <Tr key={index}>
                      <Td>
                        <Text><strong>Name</strong> - {customer.prefix}. {customer.firstName} {customer.middleName} {customer.lastName}</Text>
                        <Text><strong>Mobile</strong> - {customer.mobile}</Text>
                        <Text><strong>Alternative</strong> - {customer.alternativeMobile}</Text>
                        <Text><strong>Land Line</strong> - {customer.landLine}</Text>
                        <Text><strong>Email</strong> - {customer.email}</Text>
                      </Td>
                      <Td>
                        <Text>{customer.addressOne}.</Text>
                        <Text>{customer.addressTwo}</Text>
                        <Text mt={2}><strong>City</strong> - {customer.city}</Text>
                        <Text><strong>State</strong> - {customer.state}</Text>
                        <Text><strong>Country</strong> - {customer.country}</Text>
                        <Text><strong>zip code</strong> - {customer.zipCode}</Text>
                      </Td>
                      <Td>
                        <Text><strong>Total</strong> - {0} products</Text>
                        <Text><strong>Paid</strong> - {0}</Text>
                        <Text><strong>Due</strong> - {0}</Text>
                      </Td>
                      <Td>{customer.description}</Td>
                      <Td>{moment(customer.createdAt).format('LL')}</Td>
                      <Td isNumeric>
                        <Button size={'sm'} colorScheme='teal'>Edit</Button>
                        <Button
                          onClick={() => deleteAction({
                            id: customer.id,
                            url: '/customer/delete',
                            refetchKies: ['getCustomers']
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

              {!isLoading && !data?.customers?.length && <DataNotFound />}

            </TableContainer>

          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
