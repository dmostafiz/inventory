import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Input } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { useDebouncedState } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import { InvoiceContext } from '../../../Contexts/InvoiceContext'
import { LabelContext } from '../../../Contexts/LabelContext'
import Axios from '../../../Helpers/Axios'
import DateRangeHook from '../../../Hooks/DateRangeHook'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {
  const router = useRouter()


  const { deleteAction } = useAppActions()
  const {setProducts} = useContext(LabelContext)

  const { date, handleDateChange } = DateRangeHook()
  const [query, setQuery] = useDebouncedState('', 500);
  const [status, setStatus] = useState(null);


  useEffect(() => {
    
    if(router?.query?.status){
      setStatus(router.query.status)
    }

  }, [router])


  const { data, isLoading, error } = useQuery([date, query, status], async () => {
    const res = await Axios.get('/purchase', {
      params: {date,query, status}
    })

    console.log('products loaded', res.data)

    return res.data
  })

  const { setInvoice } = useContext(InvoiceContext)

  return (
    <Layout
      title='Purchase list'
      breads={[
        { title: 'Purchase list', link: '/home/purchases' }
      ]}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Flex alignItems={'center'} gap={5} justify='space-between'>

              <Heading size='md'>Purchase list</Heading>
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
                    <Th>Purchase Date</Th>
                    <Th>Invoice</Th>
                    <Th>Supplier</Th>
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
                            {/* <PurchaseInvoiceModal invoice={invoice} /> */}
                            <MenuItem onClick={() => setInvoice(invoice)}>Invoice</MenuItem>
                            <MenuItem onClick={() => setProducts(invoice?.purchases?.map(p => {
                              return {
                                ...p.product,
                                qty: p.quantity
                              }
                            }))}>Print Labels</MenuItem>   
                          </MenuList>
                        </Menu>
                      </Td>
                      <Td>{moment(invoice.purchaseDate).format('LL')}</Td>
                      <Td>#{invoice.refNo}</Td>
                      <Td>{invoice?.supplier?.prefix} {invoice?.supplier?.firstName} {invoice?.supplier?.lastName}</Td>
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
