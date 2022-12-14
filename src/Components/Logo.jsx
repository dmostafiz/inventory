import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function Logo({bg = 'none'}) {
    return (
        <Flex
            bg={bg}
            rounded={'xl'}
            alignItems='center'
            pr={2}
            gap={0}
            // mt={'-5px'}
            // shadow='sm'
        >
            <Image w={66} src={'/oak.png'} />
            <Text fontSize={'24px'} fontWeight='black'>TECH <Text as='span' color='#01B4A1'>OAK</Text></Text>
        </Flex>
    )
}
