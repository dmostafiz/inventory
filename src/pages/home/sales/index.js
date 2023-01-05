import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Input } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { useDebouncedState } from '@mantine/hooks'
import { IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import SalesInvoiceModal from '../../../Components/home/Dashboard/Sale/SalesInvoiceModal'
import { InvoiceContext } from '../../../Contexts/InvoiceContext'
// import MenuItem from '../../../Components/Sidebar/MenuItem'
import Axios from '../../../Helpers/Axios'
import DateRangeHook from '../../../Hooks/DateRangeHook'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {

  const { deleteAction } = useAppActions()

  const { date, handleDateChange } = DateRangeHook()
  const [query, setQuery] = useDebouncedState('', 500);

  const { data, isLoading, error } = useQuery(['getSales', date,query], async () => {
    const res = await Axios.get(`/sale`, {
      params: { date, query }
    })

    console.log('Salse loaded', res.data)

    return res.data
  })

  // useEffect(() => {

  //   console.log('Search', query)
  // }, [query])

  const { setInvoice } = useContext(InvoiceContext)


  return (
    <Layout
      title='Sales list'
      breads={[
        { title: 'Sales list', link: '/home/sales' }
      ]}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Flex alignItems={'center'} gap={5} justify='space-between'>

              <Heading size='md'>Sales list</Heading>

              <Box flex={'1'}>
                <Input
                  w={'full'}
                  icon={<Search2Icon />}
                  placeholder="Search by invoice number / customer first name, last name, email."
                  onChange={e => setQuery(e.target.value)}
                />
              </Box>

              <DateRangePicker
                // label="Book hotel"
                placeholder="Pick dates range"
                value={date}
                onChange={handleDateChange}
              />
            </Flex>

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
                          <MenuButton size='xs' colorScheme={'green'} as={Button} rightIcon={<ChevronDownIcon />}>
                            Actions
                          </MenuButton>
                          <MenuList color={'black'} shadow='md'>
                            <MenuItem onClick={() => setInvoice(invoice)}>Invoice</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                      <Td>{moment(invoice.purchaseDate).format('LL')}</Td>
                      <Td>#{invoice.refNo}</Td>
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
