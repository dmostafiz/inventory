import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function Logo({bg = 'none', rounded = 'xl'}) {
    return (
        <Flex
            bg={bg}
            rounded={rounded}
            alignItems='center'
            pr={2}
            gap={0}
            // mt={'-5px'}
            // shadow='sm'
        >
            <Image w={200} src={'/logo.png'} />
        </Flex>
    )
}
