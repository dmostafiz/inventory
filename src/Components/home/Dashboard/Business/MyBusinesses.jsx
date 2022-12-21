import { PhoneIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaCheckCircle, FaLocationArrow } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'

export default function MyBusinesses({ item }) {
    return (
        <Box
            mb={4}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={'gray.200'}
            borderRadius={'xl'}
            px={12}
        >
            <Box py={4}>
                <Text fontWeight="500" fontSize="2xl">
                    {item.name}
                </Text>
  
            </Box>
            <Box
                bg={'gray.50'}
                py={4}
                borderBottomRadius={'xl'}>
                <List spacing={3} textAlign="start" >
                    <ListItem>
                        <ListIcon as={FaLocationArrow} color="green.500" />
                        {item.location}, {item.city}, {item.state} ({item.zip})
                    </ListItem>
                    <ListItem>
                        <ListIcon as={PhoneIcon} color="green.500" />
                        {item.phone}
                    </ListItem>
               
                </List>
                <Box  pt={7} gap={2}>
                    <Button colorScheme="teal" variant="outline" mr={2}>
                        Update
                    </Button>
                    <Button colorScheme="blue" variant="outline">
                        States
                    </Button>
                </Box>
            </Box>


        </Box>
    )
}
