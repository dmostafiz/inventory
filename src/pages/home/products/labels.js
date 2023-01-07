import { DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Icon, Input, InputGroup, InputLeftAddon, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
// import PrintLabelsModal from '../../../Components/home/Dashboard/PrintLabelsModal'
import { LabelContext } from '../../../Contexts/LabelContext'
import Axios from '../../../Helpers/Axios'
import Layout from '../../../Layouts/Home/Layout'

export default function categories() {

    const {setProducts} = useContext(LabelContext)

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



    const [labelProducts, setLabelProducts] = useState([])

    const handleSearchedProductSelect = (item) => {

        const existProduct = labelProducts.find(p => p.id == item.id)

        if (existProduct) {
            // const filtered = labelProducts.filter(p => p.id != item.id)

            const modified = labelProducts.map(p => {
                if (p.id == item.id) {
                    return {
                        ...p,
                        qty: +p.qty + 1
                    }
                }

                return p
            })

            setLabelProducts(modified)

        } else {

            setLabelProducts([...labelProducts, { ...item, qty: 1 }])

        }
    }

    const removeQty = (item) => {
        const existProduct = labelProducts.find(p => p.id == item.id)

        if (existProduct && existProduct.qty > 1) {

            const modified = labelProducts.map(p => {
                if (p.id == item.id) {
                    return {
                        ...p,
                        qty: +p.qty - 1
                    }
                }

                return p
            })

            setLabelProducts(modified)

        } else {
            const filtered = labelProducts.filter(p => p.id != item.id)
            setLabelProducts(filtered)
        }
    }

    const handleGenerateLabels = () => {

        // const data = labelProducts.map(p => {
        //     return {id: p.id, qty: p.qty, sku: p.sku}
        // })

        console.log('Label print products: ', labelProducts)

    }


    return (
        <Layout
            title='Categories'
            breads={[
                { title: 'Products', link: '/home/products' },
                { title: 'Print labels', link: '/home/products/labels' }
            ]}

        //   titleRight={<CreateCategoryModal />}
        >
            <Box>
                <Card flex='1' shadow={'md'} bg='white'>
                    <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                        <Heading size='md'>Print product labels</Heading>
                    </CardHeader>
                    <CardBody p={2} pt={0}>

                        <Box>
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
                        </Box>



                        <Heading as='h5' fontSize={'19px'} mt={8}>Selected products</Heading>

                        <TableContainer mt={2}>
                            <Table variant='striped' size={'md'} bordered={true}>

                                {labelProducts.length < 1 && <TableCaption>No products added!</TableCaption>}

                                <Thead bg='#1CE7CF'>
                                    <Tr>
                                        <Th>Product</Th>
                                        <Th>Label Quantiy</Th>
                                        <Th isNumeric>
                                            <Icon as={DeleteIcon} />
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {labelProducts.map((item, index) => <Tr key={index}>
                                        <Td>{item.name} [{item.sku}]</Td>
                                        <Td>
                                            <Input
                                                borderColor={'gray.300'}
                                                type='number'
                                                min={1}
                                                defaultValue={1}
                                                value={item.qty}
                                                onChange={(e) => {
                                                    const modified = labelProducts.map(p => {
                                                        if (p.id == item.id) {
                                                            if (e.target.value < 1) {
                                                                alert('You can set minimum value 1')
                                                                return p
                                                            }
                                                            return {
                                                                ...p,
                                                                qty: e.target.value
                                                            }
                                                        }

                                                        return p
                                                    })

                                                    setLabelProducts(modified)
                                                }}
                                            />
                                        </Td>
                                        <Td isNumeric>
                                            <Icon onClick={() => removeQty(item)} color={'red'} cursor={'pointer'} as={DeleteIcon} />
                                        </Td>
                                    </Tr>
                                    )}


                                </Tbody>

                            </Table>
                        </TableContainer>


                        {labelProducts.length > 0 && <Flex justify={'flex-end'} pt={5} pb={3}>
                            {/* <PrintLabelsModal products={labelProducts} /> */}

                            <Button onClick={() => setProducts(labelProducts)} colorScheme={'teal'}>Preview Labels</Button>

                        </Flex>}

                    </CardBody>
                </Card>
            </Box>
        </Layout>
    )
}
