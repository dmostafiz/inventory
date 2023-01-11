import { Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Axios from '../../../../Helpers/Axios'
import ComponentLoader from '../../../ComponentLoader'
import DataNotFound from '../../../DataNotFound'

export default function StockAlerts() {

    const { data, isLoading } = useQuery(['stockAlerts'], async () => {
        const res = await Axios.get('/report/get_stock_alerts')
        // console.log('Product stock alerts', res.data)
        return res?.data
    })

    return (
        <Card flex='1' shadow={'md'} bg='white'>
            <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                <Heading size='md'>Product stock alerts</Heading>
            </CardHeader>
            <CardBody p={0} pt={0}>
                {(isLoading && !data?.products?.length) && <ComponentLoader />}
                {(!isLoading && !data?.products?.length) && <DataNotFound />}
                {(!isLoading && data?.products?.length) && <TableContainer>
                    <Table size='sm' variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Product</Th>
                                <Th>Brand</Th>
                                <Th>Category</Th>
                                <Th isNumeric>Current stock</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.products?.map((product, i) => {
                                if(product != undefined){
                                    return <Tr key={i} bg={product?.stock < 2 ? 'red.300' :  product?.stock < 5 ? 'red.200' : product?.stock <= product?.alertQuantity && 'red.100' }>
                                    <Td>{product?.name} [#{product?.sku}]</Td>
                                    <Td>{product?.bran?.name}</Td>
                                    <Td>{product?.category?.name}</Td>
                                    <Td isNumeric>{product.stock}</Td>
                                </Tr>
                                }
                            })}

                        </Tbody>
                    </Table>
                </TableContainer>}


            </CardBody>
        </Card>
    )
}
