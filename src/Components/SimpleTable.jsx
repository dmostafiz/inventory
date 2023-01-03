import { Box, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export default function SimpleTable({ data }) {
    return (
        <Box>

            {data.map((d) => {
                return <Flex alignItems={'start'} justify='space-between' gap={5}>
                    <Box><strong>{d.title}</strong></Box>
                    <Box>{d.value}</Box>
                </Flex>
            })}

        </Box>
    )
}
