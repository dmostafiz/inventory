import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardHeader, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, Image, Input, InputGroup, InputLeftElement, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast, VStack, Wrap } from '@chakra-ui/react'
import { Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateCustomer from '../../../Components/home/Dashboard/FormModals/CreateCustomer'
import { BusinessContext } from '../../../Contexts/BusinessContext'
import { InvoiceContext } from '../../../Contexts/InvoiceContext'
import Axios from '../../../Helpers/Axios'
import scanBarcodeHook from '../../../Hooks/scanBarcodeHook'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {

  const { scannedProduct } = scanBarcodeHook()

  const queryClient = useQueryClient()

  const toast = useToast()

  const { businessNotFound, hasBusiness } = useContext(BusinessContext)

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
          } 
          else {
            alert('You cannot exit the product stock.')
            return p
          }

        }

        return p
      })

      setSaleProducts(modified)

    } else {
      if(item.stock > 0){
        setSaleProducts([...saleProducts, { ...item, qty: 1 }])
      }else{
        alert('You cannot exit the product stock.')
      }
    }
  }

  const [totalAmount, setTotalAmount] = useState(0)
  const [paidAmount, setPaidAmount] = useState(0)
  const [dueAmount, setDueAmount] = useState(0)

  const removeQty = (item) => {
    const existProduct = saleProducts.find(p => p.id == item.id)

    if (existProduct && existProduct.qty > 1) {

        const modified = saleProducts.map(p => {
            if (p.id == item.id) {
                return {
                    ...p,
                    qty: +p.qty - 1
                }
            }

            return p
        })

        setSaleProducts(modified)

    } else {
        const filtered = saleProducts.filter(p => p.id != item.id)
        setSaleProducts(filtered)
    }
}


  useEffect(() => {
    if (totalAmount > 0 && totalAmount >= dueAmount) {
      setPaidAmount(totalAmount - dueAmount)
    } else {
      setPaidAmount(0)
    }
  }, [totalAmount, dueAmount])


  useEffect(() => {

    const total = saleProducts.reduce((acc, curr) => {

      const total = curr.qty * curr.sellingPriceIncTax
      return acc + total

    }, 0)

    setTotalAmount(total)

  }, [saleProducts])


  const { setInvoice } = useContext(InvoiceContext)

  const [creditLoading, setCreditLoading] = useState(false)
  const [cardLoading, setCardLoading] = useState(false)
  const [cashLoading, setCashLoading] = useState(false)

  const handleSubmit = async (paymentMethod) => {
    if (!saleProducts.length) return alert('Please add at least one product.')
    if (!customerId) return alert('Please select a customer.')

    if (paymentMethod === 'credit') {
      setCreditLoading(true)
    } else if (paymentMethod === 'card') {
      setCardLoading(true)
    } else {
      setCashLoading(true)
    }

    const res = await Axios.post('/pos/create', { paymentMethod, saleProducts, totalAmount, paidAmount, dueAmount, customerId, saleDate })

    console.log('Purchase create response: ', res)

    if (res?.data?.ok) {

      toast({
        title: 'Congratulations!',
        description: 'You have just created a sale invoice.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })

      setTotalAmount(0)
      setPaidAmount(0)
      setDueAmount(0)
      setSaleProducts([])
      setSelectedCustomer(null)
      setCustomerId(null)
      // setSaleDate(null)

      setInvoice(res?.data?.invoice)

    } else {
      toast({
        title: 'Ooppss!',
        description: 'Something went wrong! please try again later.',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }

    setCreditLoading(false)
    setCardLoading(false)
    setCashLoading(false)

    // posProducts
    await queryClient.refetchQueries({ queryKey: ['posProducts'] })

  }

  return (
    <Layout
      title='Point of sales'
      showSidebar={false}
    >
      <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} gap={5}>
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

        <Box w={{ base: 'full', lg: '60%' }}>
          <Card flex='1' shadow={'md'} bg='white'>
            <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
              <Flex gap={5}>
                <FormControl isRequired>
                  {/* <FormLabel>Customer</FormLabel> */}
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

                <FormControl w={'300px'} isRequired>
                  {/* <FormLabel>Sale Date</FormLabel> */}
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
              <Box w='full'>
                <Flex gap={5} direction={{ base: 'column', md: 'column', lg: 'row' }} alignItems={{ base: 'start', lg: 'center' }} justify='space-between'>
                  <Box>
                    <Box bg='gray.100' py={2} px='3'>
                      <Text>Total payable: <Text as={'span'} fontSize='17px' fontWeight={'bold'}>{totalAmount}</Text></Text>
                    </Box>
                  </Box>
                  <Wrap>
                    <Button
                      colorScheme={'pink'}
                      rounded='0'
                      isLoading={creditLoading}
                      onClick={hasBusiness() ? () => handleSubmit('credit') : businessNotFound}
                    >
                      Credit Sell
                    </Button>
                    <Button
                      colorScheme={'green'}
                      rounded='0'
                      isLoading={cardLoading}
                      onClick={hasBusiness() ? () => handleSubmit('card') : businessNotFound}
                    >
                      Credit / Debit Card
                    </Button>
                    <Button
                      colorScheme={'teal'}
                      rounded='0'
                      isLoading={cashLoading}
                      onClick={hasBusiness() ? () => handleSubmit('cash') : businessNotFound}
                    >
                      Cash Sell
                    </Button>
                  </Wrap>
                </Flex>
              </Box>
            </CardBody>
          </Card>

        </Box>
      </Flex>
    </Layout>
  )
}
