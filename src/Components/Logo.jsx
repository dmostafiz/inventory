import { Box, Image } from '@chakra-ui/react'
import React from 'react'

export default function Logo() {
    return (
        <Box
            // bg='white'
            rounded={'xl'}
        >
            <Image w={200} src={'https://assets.website-files.com/62f7d5aa77a56f6116a78dbd/62fe2830964fbb752b905466_REVSURE-logo-V1-transparent.png'} />
        </Box>
    )
}
