import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Icon, Input, InputGroup, InputLeftAddon, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FileButton, Image, Select, Title } from '@mantine/core';
import useProductUpload from '../../../../Hooks/useProductUpload';
import { DatePicker } from '@mantine/dates';
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import DataNotFound from '../../../DataNotFound';
import ComponentLoader from '../../../ComponentLoader';

const schema = yup.object({
    note: yup.string(),
}).required();

export default function CreatePurchase() {

    const queryClient = useQueryClient()

    const toast = useToast()

    const supplierData = useQuery(['getSuppliers1'], async () => {
        const res = await Axios.get('/supplier')

        console.log(res.data)
        return res?.data?.suppliers
    })

    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {

        // console.log('supplierData', supplierData.data)
        if (supplierData.data?.length > 0) {
            setSuppliers(supplierData.data.map((item) => {
                return {
                    label: item.prefix + ' ' + item.firstName + ' ' + item.lastName,
                    value: item.id,
                    addressOne: item.addressOne,
                    addressTwo: item.addressTwo,
                    city: item.city
                }
            }))
        }

    }, [supplierData.data])

    const [supplierId, setSupplierId] = useState(null)
    const [selectedSupplier, setSelectedSupplier] = useState(null)

    const [purchaseDate, setPurchaseDate] = useState(null)

    useEffect(() => {
        if (supplierId) {

            const supp = suppliers.find((item) => item.value === supplierId)
            console.log('selected supplier', supp)
            setSelectedSupplier(supp)
        }

    }, [supplierId])


    const [query, setQuery] = useState(null)
    const [searchedPrducts, setSearchedProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)

        async function getSearchData() {


            const res = await Axios.get(`/product/search/${query}/purchase`)

            if (res?.data?.ok) {
                setSearchedProducts(res?.data?.products)
            }
        }

        getSearchData()

        if (!query) {
            setSearchedProducts([])
        }

        setLoading(false)

    }, [query])



    const [purchasePrducts, setPurchaseProducts] = useState([])

    const handleSearchedProductSelect = (item) => {

        const existProduct = purchasePrducts.find(p => p.id == item.id)

        if (existProduct) {
            // const filtered = purchasePrducts.filter(p => p.id != item.id)

            const modified = purchasePrducts.map(p => {
                if (p.id == item.id) {
                    return {
                        ...p,
                        qty: +p.qty + 1
                    }
                }

                return p
            })

            setPurchaseProducts(modified)

        } else {

            setPurchaseProducts([...purchasePrducts, { ...item, qty: 1 }])

        }
    }

    const removeQty = (item) => {
        const existProduct = purchasePrducts.find(p => p.id == item.id)

        if (existProduct && existProduct.qty > 1) {

            const modified = purchasePrducts.map(p => {
                if (p.id == item.id) {
                    return {
                        ...p,
                        qty: +p.qty - 1
                    }
                }

                return p
            })

            setPurchaseProducts(modified)

        } else {
            const filtered = purchasePrducts.filter(p => p.id != item.id)
            setPurchaseProducts(filtered)
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

        const total = purchasePrducts.reduce((acc, curr) => {

            const total = curr.qty * curr.purchasePrice
            return acc + (((total * curr.taxRate) / 100) + total)

        }, 0)

        setTotalAmount(total)

    }, [purchasePrducts])


    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        note: ''
    })

    const submitNow = async (value) => {
        const res = await Axios.post('/purchase/create', { ...value, purchasePrducts, totalAmount, paidAmount, dueAmount, supplierId, purchaseDate })

        console.log('Purchase create response: ', res)

        if (res?.data?.ok) {

            // await queryClient.refetchQueries({ queryKey: ['myProducts'] })

            toast({
                title: 'Congratulations!',
                description: 'You have just created a purchase invoice.',
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            reset({
                note: '',
            })

            setTotalAmount(0)
            setPaidAmount(0)
            setDueAmount(0)
            setPurchaseProducts([])
            setQuery(null)
            setSearchedProducts([])
            setSelectedSupplier(null)
            setSupplierId(null)
            setPurchaseDate(null)

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
    }

    return (
        <Box w={'full'} p={3}>
            <SimpleGrid py={8} columns={{ base: 1, sm: 1, md: 2, lg: 4 }} spacingX={8} spacingY={4}>

                <FormControl isRequired isInvalid={errors.name}>
                    <FormLabel>Supplier</FormLabel>
                    <Select
                        placeholder="Pick a supplier here"
                        searchable
                        nothingFound="No suppliers found"
                        data={suppliers}
                        onChange={value => setSupplierId(value)}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.sku}>
                    <FormLabel>Reference No</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter reference no'
                        {...register('sku')}
                    />
                    <FormHelperText>Leave empty to generate automatically.</FormHelperText>
                    <FormErrorMessage>
                        {errors.sku && errors.sku.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.sku}>
                    <FormLabel>Purchase Date</FormLabel>
                    <DatePicker onChange={value => setPurchaseDate(value)} placeholder="Pick date" />
                    <FormErrorMessage>
                        {errors.sku && errors.sku.message}
                    </FormErrorMessage>
                </FormControl>


            </SimpleGrid>

            <hr />

            <Box py={8}>
                <Text>Products</Text>

                <InputGroup mt={3}>
                    <InputLeftAddon children={<SearchIcon />} />
                    <Input onChange={e => setQuery(e.target.value)} type='tel' placeholder='Search by product name / SKU / Scan bar code' />
                </InputGroup>

                <Box mt={2} py={query && 2} bg='gray.100'>
                    {searchedPrducts.length ? searchedPrducts.map((item, index) => {
                        return <Flex _hover={{ bg: 'blackAlpha.50' }} alignItems={'center'} justify='space-between' key={index} gap={5} borderBottom='1px' borderColor={'gray.200'} py={1} px={2}>
                            <Box>
                                <Text>{item.name} [{item.sku}] (Stock - {item.stock})</Text>
                            </Box>
                            <Button onClick={() => handleSearchedProductSelect(item)} size='sm' colorScheme={'green'}>Select</Button>
                        </Flex>
                    }) : loading ? <ComponentLoader /> : (!loading && query) && <DataNotFound />}
                </Box>

                <TableContainer mt={5}>
                    <Table variant='striped' size={'sm'} bordered={true}>

                        {purchasePrducts.length < 1 && <TableCaption>No products added!</TableCaption>}

                        <Thead bg='#1CE7CF'>
                            <Tr>
                                <Th>Product</Th>
                                <Th>SKU</Th>
                                <Th isNumeric>Qty</Th>
                                <Th isNumeric>Unit Cost (- Tax)</Th>
                                <Th isNumeric>Subtotal (- Tax)</Th>
                                <Th isNumeric>Tax</Th>
                                <Th isNumeric>Profit M (%)</Th>
                                <Th isNumeric>Unit SP (+ Tax)</Th>
                                <Th isNumeric>
                                    <Icon as={DeleteIcon} />
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>

                            {purchasePrducts.map((item, index) => <Tr key={index}>
                                <Td>{item.name}</Td>
                                <Td>{item.sku}</Td>
                                <Td isNumeric>{item.qty}</Td>
                                <Td isNumeric>{item.purchasePrice}</Td>
                                <Td isNumeric>{item.purchasePrice * item.qty}</Td>
                                <Td isNumeric>{item.taxRate}%</Td>
                                <Td isNumeric>{item.profitMargin}%</Td>
                                <Td isNumeric>{item.sellingPriceIncTax}</Td>
                                <Td isNumeric>
                                    <Icon onClick={() => removeQty(item)} color={'red'} cursor={'pointer'} as={DeleteIcon} />
                                </Td>
                            </Tr>
                            )}


                        </Tbody>

                    </Table>
                </TableContainer>

            </Box>

            <hr />


            <SimpleGrid mt={8} columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacingX={8} spacingY={4}>


                <FormControl>
                    <FormLabel>Total Amount (Inc Tax)</FormLabel>
                    <Input
                        disabled
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Enter alert quantity'
                        defaultValue={0}
                        min={0}
                        value={totalAmount}
                    />
                </FormControl>


                <FormControl isRequired>
                    <FormLabel>Paid (Inc Tax)</FormLabel>
                    <Input
                        disabled
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Enter estimated profit margin'
                        min={0}
                        value={paidAmount}
                        onChange={(e) => setPaidAmount(e.target.value)}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Due (Inc Tax)</FormLabel>
                    <Input
                        disabled={!totalAmount}
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Enter estimated profit defaultPurchasePrice'
                        min={0}
                        value={dueAmount}
                        onChange={(e) => setDueAmount(totalAmount >= e.target.value && e.target.value)}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    {/* <FormErrorMessage>
                        {errors.defaultPurchasePrice && errors.defaultPurchasePrice.message}
                    </FormErrorMessage> */}
                </FormControl>

            </SimpleGrid>

            <Box py={8}>
                <FormControl isInvalid={errors.note}>
                    <FormLabel>Purchase Note (Optional)</FormLabel>
                    <Textarea
                        rows={8}
                        maxW={{ base: '100%', lg: '100%' }}
                        focusBorderColor='#00B29E'
                        placeholder='Enter purchase note'
                        min={0}
                        {...register('note')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.note && errors.note.message}
                    </FormErrorMessage>
                </FormControl>
            </Box>

            <Box pt={8}>
                <Button
                    colorScheme={'teal'}
                    isLoading={isSubmitting}
                    loadingText={'Creating....'}
                    onClick={handleSubmit(submitNow)}
                >
                    Create Purchase
                </Button>
            </Box>
        </Box>
    )
}
