import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Input } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { useDebouncedState } from '@mantine/hooks'
import { IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import { InvoiceContext } from '../../../Contexts/InvoiceContext'
// import MenuItem from '../../../Components/Sidebar/MenuItem'
import Axios from '../../../Helpers/Axios'
import DateRangeHook from '../../../Hooks/DateRangeHook'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'
import BarChart from '../../../Components/Charts/BarChart'
import AreaChart from '../../../Components/Charts/AreaChart'
import LineChart from '../../../Components/Charts/LineChart'
import PieChart from '../../../Components/Charts/PieChart'


export default function index() {

  const router = useRouter()

  const { deleteAction } = useAppActions()

  const { date, handleDateChange } = DateRangeHook()
  const [query, setQuery] = useDebouncedState('', 500);
  const [status, setStatus] = useState(null);
  const [cashier, setCashier] = useState(null);



  useEffect(() => {

    console.log('Query: ', router?.query)

    if (router?.query?.status) {
      setStatus(router.query.status)
    }

    if (router?.query?.cashier) {

      setCashier(router.query.cashier)
    }

  }, [router])

  const { data, isLoading, error } = useQuery(['getSales', date, query, status, cashier], async () => {
    const res = await Axios.get(`/sale`, {
      params: { date, query, status, cashier }
    })

    console.log('Salse loaded', res.data)

    return res.data
  })

  // useEffect(() => {

  //   console.log('Search', query)
  // }, [query])

  const { setInvoice } = useContext(InvoiceContext)

  const [totalSales, setTotalSales] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)
  const [totalDue, setTotalDue] = useState(0)

  const [cashierName, setCashierName] = useState(null)

  useEffect(() => {

    if (data?.invoices?.length) {

      const invoices = data.invoices

      if (cashier) {
        setCashierName(invoices?.[0]?.user?.firstName + ' ' + invoices?.[0]?.user?.lastName)
      }else{
        setCashierName('')
      }

      setTotalSales(invoices.reduce((total, current) => {
        return total + current.totalAmount
      }, 0))

      setTotalPaid(invoices.reduce((total, current) => {
        return total + current.paid
      }, 0))

      setTotalDue(invoices.reduce((total, current) => {
        return total + current.due
      }, 0))
    }

  }, [data, cashier])

  console.log(date)

  return (
    <Layout
      title='Sales Report'
      breads={[
        { title: 'Sales Report', link: '/home/sales' }
      ]}
    >
      <Box>

        <Card mb='5' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={5} justify='space-between'>

              <Heading size='md'>Sales Report</Heading>

              <Box flex={'1'}>
                <Input
                  w={'full'}
                  icon={<Search2Icon />}
                  placeholder="Search by invoice number / customer first name, last name, email."
                  onChange={e => setQuery(e.target.value)}
                />
              </Box>
              <Box flex={1}>
                <DateRangePicker
                  // label="Book hotel"
                  placeholder="Pick dates range"
                  value={date}
                  onChange={handleDateChange}
                />

              </Box>

            </Flex>


          </CardHeader>
          <CardBody p={2} pt={0}>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={20} justify={'center'} alignItems={'center'}>

              <Box flex={1} w={{ base: 'full', lg: 'auto' }}>

                <PieChart keys={['Total Sales', 'Total Paid', 'Total Due']} values={[totalSales, totalPaid, totalDue]} title='Sales Report' />

              </Box>

              <Box flex={1} w={{ base: 'full', lg: 'auto' }}>

                <TableContainer>
                  <Table variant='striped'>

                    <Tbody>
                      {cashierName && <Tr>
                        <Td>Cashier</Td>
                        <Td>{cashierName}</Td>
                      </Tr>}
                      <Tr>
                        <Td>In Date</Td>
                        <Td>{date[0].toLocaleDateString()} {' '} {' - '} {' '} {date[1].toLocaleDateString()}</Td>
                      </Tr>

                      <Tr>
                        <Td>Total Sales</Td>
                        <Td>{totalSales}</Td>
                      </Tr>
                      <Tr>
                        <Td>Total Paid</Td>
                        <Td>{totalPaid}</Td>
                      </Tr>
                      <Tr>
                        <Td>Total Due</Td>
                        <Td>{totalDue}</Td>
                      </Tr>
                    </Tbody>

                  </Table>
                </TableContainer>

              </Box>

            </Flex>

          </CardBody>
        </Card>

        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
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
                    <Th>Cashier</Th>
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
                      <Td>{invoice?.user?.firstName} {invoice?.user?.lastName}</Td>
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
