import { PhoneIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, List, ListIcon, ListItem, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaCheckCircle, FaLocationArrow } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import UpdateBusiness from './UpdateBusiness'

export default function MyBusinesses({ item }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

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
                    {item.name} ({item.businessType})
                </Text>

            </Box>
            <Box
                // bg={'gray.50'}
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
                <Box pt={7} gap={2}>
                    <Button  onClick={onOpen} colorScheme="teal" variant="outline" mr={2}>
                        Update Business
                    </Button>
                    {/* <Button colorScheme="blue" variant="outline">
                        States
                    </Button> */}
                </Box>
            </Box>


            <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Business</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>

                        <UpdateBusiness business={item} />

                    </ModalBody>

                </ModalContent>
            </Modal>


        </Box>
    )
}
