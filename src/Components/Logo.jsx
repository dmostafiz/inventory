import { Box, Image } from '@chakra-ui/react'
import React from 'react'

export default function Logo({bg = 'none'}) {
    return (
        <Box
            bg={bg}
            rounded={'xl'}
            // shadow='sm'
        >
            <Image w={200} src={'/logo.png'} />
        </Box>
    )
}
