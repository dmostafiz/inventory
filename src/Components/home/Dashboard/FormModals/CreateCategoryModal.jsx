import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export default function CreateCategoryModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} colorScheme={'teal'} variant='outline' size={'sm'}>Create Category</Button>
            <Modal closeOnOverlayClick={false} size={{base:'sm', sm:'lg', md:'2xl'}} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderBottom='2px' borderColor='gray.100' py={2}>Create Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>

                    <ModalFooter borderTop='2px' borderColor='gray.100' py={2}>
                        <Button colorScheme='gray'  onClick={onClose}>Cancel</Button>
                        <Button colorScheme='teal' ml={3}>
                            Create Category
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
