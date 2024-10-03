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


export default function profits() {

  const router = useRouter()

  const { deleteAction } = useAppActions()

  const {date, handleDateChange } = DateRangeHook()
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
    const res = await Axios.get(`/report/profites`, {
      params: { date, query, cashier }
    })

    console.log('Salse loaded', res.data)

    return res.data
  })

  // useEffect(() => {

  //   console.log('Search', query)
  // }, [query])

  const { setInvoice } = useContext(InvoiceContext)

  const [totalSales, setTotalSales] = useState(0)
  const [totalCost, setCost] = useState(0)
  const [saleProfit, setSaleProfit] = useState(0)
  const [nitProfit, setNitSaleProfit] = useState(0)

  const [cashierName, setCashierName] = useState(null)

  useEffect(() => {

    if (data?.sales?.length) {

      const sales = data.sales

      if (cashier) {
        setCashierName(sales?.[0]?.user?.firstName + ' ' + sales?.[0]?.user?.lastName)
      }else{
        setCashierName('')
      }

      const salesCount = sales.reduce((total, current) => {
        return total + (current.product.sellingPriceIncTax * current.quantity)
      }, 0)
      setTotalSales(salesCount)


      const costCount = sales.reduce((total, current) => {
        return total + (current.product.purchasePrice * current.quantity)
      }, 0)
      setCost(costCount)

      setSaleProfit(salesCount - costCount)

    }

  }, [data, cashier])

  console.log(date)

  return (
    <Layout
      title='Profits'
      breads={[
        { title: 'Profits', link: '/home/profits' }
      ]}
    >
      <Box>

        <Card mb='5' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={5} justify='space-between'>

              <Heading size='md'>Profits Report</Heading>

              <Box flex={'1'}>
                <Input
                  w={'full'}
                  icon={<Search2Icon />}
                  placeholder="Search by product name / invoice number / customer first name, last name, email."
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

                <PieChart name={'pie'} keys={['Total Sales', 'Total cost on products', 'Total Profits']} values={[totalSales, totalCost, saleProfit]} title='Sales Report' />

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
                        <Td>Total product costs</Td>
                        <Td>{totalCost}</Td>
                      </Tr>
                      <Tr>
                        <Td>Total Profits</Td>
                        <Td>{saleProfit}</Td>
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
            <Heading size='md'>Sale Items list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.sales?.length > 0 && <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th isNumeric></Th>
                    <Th>Sale Date</Th>
                    <Th>Invoice</Th>
                    <Th>Product</Th>
                    <Th>Cashier</Th>
                    <Th>Customer</Th>
                    <Th>Unit Price</Th>
                    <Th>Total Amount</Th>
                    <Th>Stock</Th>
                    <Th>Created</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.sales?.map((sale, index) => {
                    return <Tr key={index}>
                      <Td isNumeric>
                        <Menu>
                          <MenuButton size='xs' colorScheme={'green'} as={Button} rightIcon={<ChevronDownIcon />}>
                            Actions
                          </MenuButton>
                          <MenuList color={'black'} shadow='md'>
                            <MenuItem onClick={() => setInvoice(sale?.invoice)}>Invoice</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                      <Td>{moment(sale?.createdAt).format('LL')}</Td>
                      <Td>#{sale?.invoice?.refNo}</Td>
                      <Td>{sale?.product?.name}</Td>
                      <Td>{sale?.user?.firstName} {sale?.user?.lastName}</Td>
                      <Td>{sale?.customer?.prefix} {sale?.customer?.firstName} {sale?.customer?.lastName}</Td>
                      <Td>{sale.unitPrice}</Td>
                      <Td>{sale.total}</Td>
                      <Td>{sale.quantity}</Td>
                      <Td>{moment(sale?.createdAt).format('LL')}</Td>

                    </Tr>

                  })}

                </Tbody>
              </Table>}

              {!isLoading && !data?.sales?.length && <DataNotFound />}

            </TableContainer>

          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
