import { Box, Container, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Footer from '../Components/LandingPage/Footer'
import Navbar from '../Components/LandingPage/Navbar'

export default function about() {
    return (
        <>
            <Navbar />
            <Box minH='100vh'>
                <Container maxW={'6xl'} py={5}>
                    <Flex direction={{ base: 'column', xl: 'row' }} gap={10} alignItems={'center'}>

                        <Box w={{ base: '100%', xl: '50%' }}>
                            <Image w='full' src='https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' />
                        </Box>

                        <Box flex={1}>
                            <Text fontSize={'17px'}>
                                We are a company which seeks to revolutionize how businesses operate by helping
                                them optimize on inventory by using our easy to use inventory management system.
                                <br /> <br />
                                We also provide other solutions such as contactless payments for school canteens.
                            </Text>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
