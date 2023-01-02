import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardHeader, Heading, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import SalesInvoiceModal from '../../../Components/home/Dashboard/Sale/SalesInvoiceModal'
// import MenuItem from '../../../Components/Sidebar/MenuItem'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {

  const { deleteAction } = useAppActions()

  const { data, isLoading, error } = useQuery(['getSales'], async () => {
    const res = await Axios.get('/sale')

    console.log('Salse loaded', res.data)

    return res.data
  })


  return (
    <Layout
      title='Sales list'
      breads={[
        { title: 'Sales list', link: '/home/sales' }
      ]}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Sales list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.invoices?.length > 0 && <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th isNumeric></Th>
                    <Th>Sale Date</Th>
                    <Th>Invoice</Th>
                    <Th>Customer</Th>
                    <Th>Total Amount</Th>
                    <Th>Paid</Th>
                    <Th>Due</Th>
                    <Th>Note</Th>
                    <Th>Created</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.invoices?.map((invoice, index) => {
                    return <Tr key={index}>
                      <Td isNumeric>
                        <Menu>
                          <MenuButton  size='xs' colorScheme={'green'}  as={Button} rightIcon={<ChevronDownIcon />}>
                            Actions
                          </MenuButton>
                          <MenuList color={'black'} shadow='md'>
                            <SalesInvoiceModal invoice={invoice} />
                            {/* <MenuItem>Create a Copy</MenuItem> */}
                          </MenuList>
                        </Menu>
                      </Td>
                      <Td>{moment(invoice.purchaseDate).format('LL')}</Td>
                      <Td>{invoice.refNo}</Td>
                      <Td>{invoice?.customer?.prefix} {invoice?.customer?.firstName} {invoice?.customer?.lastName}</Td>
                      <Td>{invoice.totalAmount}</Td>
                      <Td>{invoice.paid}</Td>
                      <Td>{invoice.due}</Td>
                      <Td>{invoice.note}</Td>
                      <Td>{moment(invoice.createdAt).format('LL')}</Td>

                    </Tr>

                  })}

                </Tbody>
              </Table>}

              {!isLoading && !data?.invoices?.length && <DataNotFound />}

            </TableContainer>

          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
