import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateStaffModal from '../../../Components/home/Dashboard/FormModals/CreateStaffModal'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'
import moment from 'moment'

export default function index() {

    const { data, error, isLoading } = useQuery(['getUsers'], async () => {
        const res = await Axios('/user/get')
        console.log('Load users', res)
        return res?.data
    })

    const { deleteAction } = useAppActions()

    return (
        <Layout
            onlyAdmin={true}
            title='Staff'
            breads={[
                { title: 'Staff', link: '/home/staff' }
            ]}
            titleRight={<CreateStaffModal />}
        >
            <Box>
                <Card flex='1' shadow={'md'} bg='white'>
                    <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                        <Heading size='md'>Staff list</Heading>
                    </CardHeader>
                    <CardBody p={2} pt={0}>
                        <TableContainer>
                            {isLoading && <ComponentLoader />}

                            {!isLoading && data?.users?.length > 0 && <Table size='sm' variant='striped'>
                                <Thead>
                                    <Tr>
                                        <Th>First Name</Th>
                                        <Th>Last Name</Th>
                                        <Th>Email</Th>
                                        {/* <Th>Role</Th> */}
                                        <Th>Added Date</Th>
                                        <Th isNumeric></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data?.users?.map((user, index) => {
                                        return <Tr key={index}>
                                            <Td>{user.firstName}</Td>
                                            <Td>{user.lastName}</Td>
                                            <Td>{user.email}</Td>
                                            {/* <Td>{'Sales'}</Td> */}
                                            <Td>{moment(user.createdAt).format('lll')}</Td>
                                            <Td isNumeric>
                                                <Button size={'sm'} colorScheme='teal'>Edit</Button>
                                                <Button
                                                    onClick={() => deleteAction({
                                                        id: user.id,
                                                        url: '/user/delete',
                                                        refetchKies: ['getusers']
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

                            {!isLoading && !data?.users?.length && <DataNotFound />}

                        </TableContainer>
                    </CardBody>
                </Card>
            </Box>
        </Layout>
    )
}
