import { Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React, { useContext } from 'react'
import { InvoiceContext } from '../../../../Contexts/InvoiceContext'
import Axios from '../../../../Helpers/Axios'
import ComponentLoader from '../../../ComponentLoader'
import DataNotFound from '../../../DataNotFound'

export default function PurchaseDue() {

    const { setInvoice } = useContext(InvoiceContext)

    const { data, isLoading } = useQuery(['getPurchasesDue'], async () => {
        const res = await Axios.get('/report/get_purchases_due')

        console.log('Purchases due', res.data)
        return res?.data
    })

    return (
        <Card flex='1' shadow={'md'} bg='white'>
            <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                <Heading size='md'>Purchase payments due</Heading>
            </CardHeader>
            <CardBody p={0} pt={0}>
                {(isLoading && !data?.purchases?.length > 0) && <ComponentLoader />}
                {(!isLoading && !data?.purchases?.length > 0) && <DataNotFound />}
                {(!isLoading && data?.purchases?.length > 0) && <TableContainer maxH={'400px'} overflowY='auto'>
                    <Table size='sm' variant='striped'>
                        <Thead>
                            <Tr>
                                <Th>Supplier</Th>
                                <Th>Invoice No</Th>
                                <Th isNumeric>Total</Th>
                                <Th isNumeric>Paid Amount</Th>
                                <Th isNumeric>Due Amount</Th>
                                <Th isNumeric>Invoice Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.purchases?.map((item, i) => {
                                return <Tr key={i}>
                                    <Td>{item.supplier.prefix} {item.supplier.firstName}</Td>
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
