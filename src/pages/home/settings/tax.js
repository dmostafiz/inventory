import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateBrandModal from '../../../Components/home/Dashboard/FormModals/CreateBrandModal'
import CreateTaxModal from '../../../Components/home/Dashboard/FormModals/CreateTaxModal'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function tax() {

    const { data, error, isLoading } = useQuery(['getTaxes'], async () => {
        const res = await Axios('/tax/get')
        console.log('Load taxes', res)
        return res?.data
    })

    const { deleteAction } = useAppActions()

    return (
        <Layout
            title='Tax Rates'
            breads={[
                { title: 'Settings', link: '#' },
                { title: 'Tax Rates', link: '/home/settings/tax' }
            ]}

            titleRight={<CreateTaxModal />}
        >
            <Box>
                <Card flex='1' shadow={'md'} bg='white'>
                    <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                        <Heading size='md'>Tax Rates</Heading>
                    </CardHeader>
                    <CardBody p={2} pt={0}>
                        <TableContainer>
                            {isLoading && <ComponentLoader />}

                            {!isLoading && data?.taxes?.length > 0 && <Table size='sm' variant='striped'>
                                <Thead>
                                    <Tr>
                                        <Th>Tax Name</Th>
                                        <Th>Rate (%)</Th>
                                        <Th isNumeric></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data?.taxes?.map((tax, index) => {
                                        return <Tr key={index}>
                                            <Td>{tax.name}</Td>
                                            <Td>{tax.rate}</Td>
                                            <Td isNumeric>
                                                <Button size={'sm'} colorScheme='teal'>Edit</Button>
                                                <Button
                                                    onClick={() => deleteAction({
                                                        id: tax.id,
                                                        url: '/tax/delete',
                                                        refetchKies: ['getTaxes']
                                                    })}
                                                    size={'sm'}
                                                    colorScheme='red'
                                                    ml={2}>
                                                    Delete
                                                </Button>
                                            </Td>
                                        </Tr>
                                    })}
                                </Tbody>
                            </Table>}

                            {!isLoading && !data?.taxes?.length && <DataNotFound />}

                        </TableContainer>
                    </CardBody>
                </Card>
            </Box>
        </Layout>
    )
}
