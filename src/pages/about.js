import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Footer from '../Components/LandingPage/Footer'
import Navbar from '../Components/LandingPage/Navbar'

export default function about() {
    return (
        <>
            <Navbar />
            <Box minH='100vh'>
                <Container maxW={'6xl'} py={5}>
                    <Flex direction={{ base: 'column', xl: 'row' }} gap={10}>

                        {/* <Box w={{ base: '100%', xl: '50%' }}>
                            <Image w='full' src='https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg' />
                        </Box> */}

                        <Box flex={1}>
                            <Text fontWeight={'bold'} fontSize={'4xl'} mb={5}>Unlock the Power of Tech-oak</Text>
                            <Text fontSize={'17px'}>
                                Welcome to Tech-oak, your ultimate all-in-one business solution! We are passionate about
                                revolutionizing the way you manage your business. Our platform is designed to empower you
                                with seamless inventory management, efficient suppliers handling, superior customer
                                management, loyalty building, and data analytics that drive performance.
                                <br /> <br />
                                At Tech-oak, we believe that business management shouldn&#39;t be a hassle. Our user-friendly
                                interface and powerful features ensure that you&#39;re always in control, making your operations
                                smoother and more successful. With years of experience and a deep understanding of business
                                needs, we&#39;ve created a platform that adapts to your unique requirements and helps you thrive.
                                <br /> <br />
                                Join the Tech-oak family and experience the future of business management today. Let&#39;s
                                embark on this journey together!
                                <br /> <br />
                            </Text>
                            <Box>
                                <Button colorScheme='teal' mr={3}>Start with Tech Oak</Button>
                                <Button colorScheme='orange' mr={3}>Tech-oak retail</Button>

                            </Box>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
