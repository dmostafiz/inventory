import { Box, Card, CardBody, CardHeader, Heading, Icon, SimpleGrid } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import ComponentLoader from '../../../../Components/ComponentLoader'
import CreateBusiness from '../../../../Components/home/Dashboard/Business/CreateBusiness'
import MyBusinesses from '../../../../Components/home/Dashboard/Business/MyBusinesses'
import Axios from '../../../../Helpers/Axios'
import Layout from '../../../../Layouts/Home/Layout'

export default function index() {

    const { data, error, isLoading } = useQuery(['myBusinesses'], async () => {
        const res = await Axios.get('/business')

        // console.log('Business response', res)
        return res.data
    })

    return (
        <Layout
            onlyAdmin={true}
            title='Business'
            breads={[
                { title: 'Settings', link: '#' },
                { title: 'Business', link: '/home/settings/business' },
            ]}
        >

            {isLoading

                ? <ComponentLoader />

                : data?.businesses?.length

                    ? <Box>
                        <Card flex='1' shadow={'md'} bg='white'>
                            <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                                <Heading size='md'> My Businesses</Heading>
                            </CardHeader>
                            <CardBody p={2} pt={0}>
                                <Box p={3}>
                                    <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={5}>
                                        {data?.businesses?.map((businiess, index) => <MyBusinesses key={index} item={businiess} />)}
                                    </SimpleGrid>
                                </Box>

                            </CardBody>
                        </Card>
                    </Box>

                    : <Box>
                        <Card flex='1' shadow={'md'} bg='white'>
                            <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                                <Heading size='md'><Icon as={FaHome} fontSize='30px' /> Setup business</Heading>
                            </CardHeader>
                            <CardBody p={2} pt={0}>
                                <CreateBusiness />
                            </CardBody>
                        </Card>
                    </Box>
            }
        </Layout>
    )
}
