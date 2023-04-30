import { Box, Container, Flex, Image, ListItem, OrderedList, Text } from '@chakra-ui/react'
import React from 'react'
import Footer from '../Components/LandingPage/Footer'
import Navbar from '../Components/LandingPage/Navbar'

export default function nfc() {
    return (
        <>
            <Navbar />
            <Box minH='100vh'>
                <Container maxW={'6xl'} py={5}>
                    <Flex direction={{ base: 'column', xl: 'row' }} gap={10}>

                        <Box w={{ base: '100%', xl: '50%' }}>
                            <Image w='full' src='https://us-en-cdn.square.ncms.io/content/uploads/2023/04/NFC-Guide-Managing-Your-Finances.jpg.jpeg' />
                        </Box>

                        <Box flex={1}>
                            <Text mb={2} fontSize={'17px'}>
                                For many years payments in school canteens has remained the same. Paying using
                                cash, long cues among other issues. Here at Tech-oak we have perfect solution to all
                                this problems.
                            </Text>

                            <Text mb={2} fontSize={'17px'}>
                                We seek to revolutionize payments in school canteens by use of NFC
                                technology(Near field communication) through this we provide a fast yet cashless
                                solution in school canteens.
                            </Text>

                            <Text mb={4} fontSize={'17px'}>
                                Besides that we provide solutions to the concerns parents could have in their children
                                using school canteens.
                            </Text>

                            <Text fontWeight={'bold'} mb={2} fontSize={'17px'}>
                                The features of using this application include:
                            </Text>


                            <OrderedList>
                                <ListItem>Getting weekly emails and reports concerning the commodities their children
                                    consume in school.</ListItem>
                                <ListItem>Restricting their children from consuming certain commodities such soda when
                                    parents are creating an account.</ListItem>
                            </OrderedList>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
