import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import Logo from '../Logo'

export default function Navbar({ bg = '' }) {
    return (
        <Box bg={bg} w='full' borderBottom={'1px'} borderColor='blackAlpha.200'>
            <Container
                py={3}
                maxW='6xl'
            >

                <Flex w='full' alignItems='center' justify='space-between'>

                    <Link href='/'>
                        <Logo bg='white' />
                    </Link>

                    <Flex alignItems='center' gap={5}>
                        <Link href='/about'>
                            <Text>About</Text>
                        </Link>
                        <Link href='/inventory'>
                            <Text>Inventory</Text>
                        </Link>
                        <Link href='/nfc'>
                            <Text>NFC</Text>
                        </Link>
                        <Link href='/subscription'>
                            <Text>Subscription</Text>
                        </Link>
                        <Link href='/contact'>
                            <Text>Contact</Text>
                        </Link>
                    </Flex>

                    <Flex alignItems='center' gap={2}>
                        <Link href='/auth/login'>
                            <Button size='md' colorScheme={'blackAlpha'}>Store login</Button>
                        </Link>
                        <Link href='/auth/register'>
                            <Button size='md' colorScheme={'teal'}>Create account</Button>
                        </Link>
                    </Flex>

                </Flex>
            </Container>
        </Box>
    )
}
