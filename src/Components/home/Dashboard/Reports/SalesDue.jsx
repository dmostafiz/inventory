import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import Axios from '../../../../Helpers/Axios'
import ComponentLoader from '../../../ComponentLoader'
import DataNotFound from '../../../DataNotFound'
import moment from 'moment'
import { InvoiceContext } from '../../../../Contexts/InvoiceContext'

export default function SalesDue() {

    const { setInvoice } = useContext(InvoiceContext)

    const { data, isLoading } = useQuery(['getSalesDue'], async () => {
        const res = await Axios.get('/report/get_sales_due')

        console.log('Sales due', res.data)
        return res?.data
    })
    return (
        <Card flex='1' shadow={'md'} bg='white'>
            <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                <Heading size='md'>Sales payment due</Heading>
            </CardHeader>
            <CardBody p={0} pt={0}>
                {(isLoading && !data?.sales?.length) && <ComponentLoader />}
                {(!isLoading && !data?.sales?.length) && <DataNotFound />}
                {(!isLoading && data?.sales?.length) && <TableContainer maxH={'400px'} overflowY='auto'>
                    <Table size='sm' variant='striped'>
                        <Thead>
                            <Tr>
                                <Th>Customer</Th>
                                <Th>Invoice No</Th>
                                <Th isNumeric>Total</Th>
                                <Th isNumeric>Paid Amount</Th>
                                <Th isNumeric>Due Amount</Th>
                                <Th isNumeric>Invoice Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.sales?.map((item, i) => {
                                return <Tr key={i}>
                                    <Td>{item.customer.prefix} {item.customer.firstName}</Td>
                                    <Td><Button onClick={() => setInvoice(item)} size='xs' colorScheme='teal'>
                                        #{item.refNo}
                                    </Button>
                                    </Td>
                                    <Td isNumeric>{item.totalAmount.toFixed(2)}</Td>
                                    <Td isNumeric>{item.paid.toFixed(2)}</Td>
                                    <Td isNumeric>{item.due.toFixed(2)}</Td>
                                    <Td isNumeric>{item.invoiceData ? moment(item.invoiceData).format('LLL') : '___'}</Td>
                                </Tr>
                            })}


                        </Tbody>
                    </Table>
                </TableContainer>}



            </CardBody>
        </Card>
    )
}
