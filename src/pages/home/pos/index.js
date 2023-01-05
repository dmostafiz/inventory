import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Card, CardBody, CardHeader, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, Image, Input, InputGroup, InputLeftElement, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateCustomer from '../../../Components/home/Dashboard/FormModals/CreateCustomer'
import Axios from '../../../Helpers/Axios'
import scanBarcodeHook from '../../../Hooks/scanBarcodeHook'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {

  const { scannedProduct } = scanBarcodeHook()

  const { data, isLoading } = useQuery(['posProducts'], async () => {
    const res = await Axios.get('/pos/products')
    return res.data
  })


  const customerData = useQuery(['getCustomers1'], async () => {
    const res = await Axios.get('/customer')

    console.log(res.data)
    return res?.data?.customers
  })

  const [customers, setCustomers] = useState([])

  useEffect(() => {

    // console.log('customerData', customerData.data)
    if (customerData.data?.length > 0) {
      setCustomers(customerData.data.map((item) => {
        return {
          label: item.prefix + ' ' + item.firstName + ' ' + item.lastName,
          value: item.id,
          addressOne: item.addressOne,
          addressTwo: item.addressTwo,
          city: item.city
        }
      }))
    }

  }, [customerData.data])

  const [customerId, setCustomerId] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const [saleDate, setSaleDate] = useState(new Date())

  useEffect(() => {
    if (customerId) {

      const cust = customers.find((item) => item.value === customerId)
      console.log('selected customer', customerId)
      setSelectedCustomer(cust)

    }

  }, [customerId])


  const [saleProducts, setSaleProducts] = useState([])

  const handleSearchedProductSelect = (item) => {

    const existProduct = saleProducts.find(p => p.id == item.id)

    if (existProduct) {
      // const filtered = saleProducts.filter(p => p.id != item.id)

      const modified = saleProducts.map(p => {
        if (p.id == item.id) {

          if (p.stock > p.qty) {
            return {
              ...p,
              qty: +p.qty + 1
            }
          } else {
            alert('This product is out of stock')
            return p
          }

        }

        return p
      })

      setSaleProducts(modified)

    } else {
      setSaleProducts([...saleProducts, { ...item, qty: 1 }])
    }
  }

  const [totalAmount, setTotalAmount] = useState(0)
  const [paidAmount, setPaidAmount] = useState(0)
  const [dueAmount, setDueAmount] = useState(0)

  useEffect(() => {
    if (totalAmount > 0 && totalAmount >= dueAmount) {
      setPaidAmount(totalAmount - dueAmount)
    } else {
      setPaidAmount(0)
    }
  }, [totalAmount, dueAmount])


  useEffect(() => {

    const total = saleProducts.reduce((acc, curr) => {

      const total = curr.qty * curr.purchasePrice
      return acc + (((total * curr.taxRate) / 100) + total)

    }, 0)

    setTotalAmount(total)

  }, [saleProducts])


  return (
    <Layout
      title='Point of sales'
      showSidebar={false}
    >
      <Flex gap={5}>
        <Box flex='1'>

          <InputGroup w="full">
            <InputLeftElement color="gray.900">
              <FiSearch />
            </InputLeftElement>
            <Input
              bg='whiteAlpha.700'
              _hover={{
                borderColor: 'blackAlpha.100'
              }}
              _focus={{
                ring: '0',
                borderColor: 'blackAlpha.100',
                shadow: 'md'
              }}
              shadow={'sm'}
              border='0px'
              borderColor='blackAlpha.50'
              placeholder="Search products by name / SKU / Scan Bar code"
              rounded={'full'}
            />
          </InputGroup>

          <Box py={5}>
            {isLoading && !data?.products?.length && <ComponentLoader />}

            <Box w='full' h={'60vh'} overflowX={'auto'}>
              {!isLoading && data?.products?.length > 0 && <SimpleGrid spacing={3} columns={{ base: 2, sm: 3, md: 3, lg: 4, xl: 4 }}>
                {data?.products?.map((product, i) => {
                  return <Box index={i} onClick={() => handleSearchedProductSelect(product)} cursor={'pointer'} _hover={{ shadow: 'lg' }} key={i} w='full' bg='white' p={2} shadow='md' rounded={'md'}>
                    <VStack spacing={0}>
                      <Image h='58' src={product.image} alt={product.name} />
                      <Heading textAlign={'center'} fontSize={'12px'} as='h4'>{product.name}</Heading>
                      <Text fontSize={'12px'}>{product.sku}</Text>
                      <Text fontSize={'10px'}>Price (+Tax): {product.sellingPriceIncTax?.toFixed(2)}</Text>
                    </VStack>
                  </Box>
                })} </SimpleGrid>}
            </Box>

            {!isLoading && data?.products?.length === 0 && <DataNotFound />}

          </Box>

        </Box>
        <Box w='60%'>
          <Card flex='1' shadow={'md'} bg='white'>
            <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
              <Flex>
                <FormControl isRequired>
                  <FormLabel>Customer</FormLabel>
                  <Flex gap={2} alignItems={'center'}>
                    <Select
                      placeholder="Pick a customer here"
                      searchable
                      nothingFound="No customers found"
                      data={customers}
                      value={customerId}
                      onChange={value => setCustomerId(value)}
                    />

                    <Box>
                      <CreateCustomer
                        setCustomerId={setCustomerId}
                        button={<Icon as={FaPlus} />}
                      />
                    </Box>
                  </Flex>
                  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                  {/* <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage> */}
                </FormControl>

                <FormControl  w={'300px'}  isRequired>
                  <FormLabel>Sale Date</FormLabel>
                  <DatePicker value={saleDate} onChange={value => setSaleDate(value)} placeholder="Pick date" />
                  {/* <FormErrorMessage>
                        {errors.sku && errors.sku.message}
                    </FormErrorMessage> */}
                </FormControl>
              </Flex>


            </CardHeader>
            <CardBody px={2} pt={0}>
              <Box w='full' h={'60vh'} overflowX={'auto'}>
                <TableContainer>
                  <Table variant='striped' size={'sm'} bordered={true}>

                    {saleProducts.length < 1 && <TableCaption>No products added!</TableCaption>}

                    <Thead bg='#1CE7CF'>
                      <Tr>
                        <Th>Product</Th>
                        <Th isNumeric>Qty</Th>
                        <Th isNumeric>Price (Inc Tax)</Th>
                        <Th isNumeric>Subtotal (Inc Tax)</Th>
                        <Th isNumeric>
                          <Icon as={DeleteIcon} />
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>

                      {saleProducts.map((item, index) => <Tr key={index}>
                        <Td>{item.name}</Td>
                        <Td isNumeric>{item.qty}</Td>
                        <Td isNumeric>{item.sellingPriceIncTax}</Td>
                        <Td isNumeric>{item.sellingPriceIncTax * item.qty}</Td>
                        <Td isNumeric>
                          <Icon onClick={() => removeQty(item)} color={'red'} cursor={'pointer'} as={DeleteIcon} />
                        </Td>
                      </Tr>
                      )}


                    </Tbody>

                  </Table>
                </TableContainer>
              </Box>
            </CardBody>
          </Card>

        </Box>
      </Flex>
    </Layout>
  )
}
