import { Center, Text } from '@chakra-ui/react'
import React from 'react'

export default function DataNotFound({text='No data found!'}) {
    return (
        <Center py={16}>
            <Text color={'gray.400'}>{text}</Text>
        </Center>
    )
}
