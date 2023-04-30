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
                            <Box mb={8}>
                                <Text fontWeight={'bold'} mb={2} fontSize={'17px'}>
                                    Basic subscription
                                </Text>


                                <OrderedList>
                                    <ListItem>Feature 1</ListItem>
                                    <ListItem>Feature 2</ListItem>
                                </OrderedList>
                            </Box>

                            <Box>
                                <Text fontWeight={'bold'} mb={2} fontSize={'17px'}>
                                    Premium subscription
                                </Text>


                                <OrderedList>
                                    <ListItem>Feature 1</ListItem>
                                    <ListItem>Feature 2</ListItem>
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
