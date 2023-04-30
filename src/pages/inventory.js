import { Box, Container, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Footer from '../Components/LandingPage/Footer'
import Navbar from '../Components/LandingPage/Navbar'

export default function inventory() {
    return (
        <>
            <Navbar />
            <Box minH='100vh'>

                <Container maxW={'6xl'} py={5}>
                    <Flex direction={{ base: 'column', xl: 'row' }} gap={10} alignItems={'center'}>

                        <Box w={{ base: '100%', xl: '50%' }}>
                            <Image w='full' src='https://www.deskera.com/blog/content/images/2021/06/InventoryManagement_Hero@3x.png' />
                        </Box>

                        <Box flex={1}>
                            <Text fontSize={'17px'}>
                                There's an old business axiom that says, "Nothing happens until somebody sells
                                something." With inventory management, that could be changed to "Nothing happens
                                until somebody counts something."
                            </Text>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
