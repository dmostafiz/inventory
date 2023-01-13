import { Box, Heading, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

export default function ProfileInfo({ user }) {
    return (
        <Box>

            <Box mb={4}>
                <Heading size='xs'>
                    First Name
                </Heading>
                <Text pt='2' fontSize='sm'>
                    {user?.firstName}
                </Text>
            </Box>

            <Box mb={4}>
                <Heading size='xs'>
                    Last Name
                </Heading>
                <Text pt='2' fontSize='sm'>
                    {user?.lastName}
                </Text>
            </Box>

            <Box mb={4}>
                <Heading size='xs'>
                    Email Address
                </Heading>
                <Text pt='2' fontSize='sm'>
                    {user?.email}
                </Text>
            </Box>


            <Box mb={4}>
                <Heading size='xs'>
                    Account Created
                </Heading>
                <Text pt='2' fontSize='sm'>
                    {user?.createdAt && moment(user.createdAt).format('lll')}
                </Text>
            </Box>


            <Box mb={4}>
                <Heading size='xs'>
                    Last Update
                </Heading>
                <Text pt='2' fontSize='sm'>
                    {user?.updatedAt && moment(user.updatedAt).format('lll')}
                </Text>
            </Box>

        </Box>
    )
}
