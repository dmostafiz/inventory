import { Box, Container, Flex, Image, ListItem, OrderedList, Text } from '@chakra-ui/react'
import React from 'react'
import Footer from '../Components/LandingPage/Footer'
import Navbar from '../Components/LandingPage/Navbar'

export default function subscription() {
    return (
        <>
            <Navbar />
            <Box minH='100vh'>
                <Container maxW={'6xl'} py={5}>
                    <Flex direction={{ base: 'column', xl: 'row' }} gap={10}>

                        <Box w={{ base: '100%', xl: '50%' }}>
                            <Image w='full' src='https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?w=2000' />
                        </Box>

                        <Box flex={1}>
                            <Text mb={5}>
                                First of all one gets a 2 week free trial to try out all the features including premium ones
                            </Text>
                            <Text mb={5}>
                                Ones the 14 day trial ends
                            </Text>
                            <Box mb={8}>
                                <Text fontWeight={'bold'} mb={2} fontSize={'17px'}>
                                    Premium Plan
                                </Text>


                                <OrderedList>
                                    <ListItem>Point of sale</ListItem>
                                    <ListItem>Data analytics (all data showing
                                        sales,purchase, inventory within a certain period etc (anything on the dashboard)</ListItem>
                                    <ListItem>Customer data which helps in customer loyalt</ListItem>
                                    <ListItem>Staff analytics</ListItem>
                                </OrderedList>
                            </Box>

                            <Box mb={8}>
                                <Text fontWeight={'bold'} mb={2} fontSize={'17px'}>
                                    Free Plan
                                </Text>


                                <OrderedList>
                                    <ListItem>Supplier entry</ListItem>
                                    <ListItem>Adding new products</ListItem>
                                </OrderedList>
                            </Box>


                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
