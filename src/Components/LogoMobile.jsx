import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function LogoMobile({ bg = 'none' }) {
    return (
        <Box
            bg={bg}
            rounded={'xl'}
            shadow='md'
        >
            <Image w={42} src={'/oak.png'} />
        </Box>
    )
}
