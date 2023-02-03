import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import Axios from '../../../../Helpers/Axios'
import toasterHook from '../../../../Hooks/toasterHook'

export default function CreateSubscription() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const toastMe = toasterHook()

    const handlePay = async () => {

        setLoading(true)
        const res = await Axios.post('/subscription/active')
    
        if (res?.data?.ok) {
            toastMe({ title: 'Congratulations', description: 'Your subscription has been activated successfully', status: 'success' })
            onClose()

            router.reload()
        }

        setLoading(false)

    }

    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme='teal'>
                Subscribe Now
            </Button>

            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderBottom={'1px'} borderColor='gray.300'>Make payment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Text>Pay <Text as='span' fontSize={'2xl'}>$55</Text>/month to unlock our extended features.</Text>

                    </ModalBody>
                    <ModalFooter borderTop={'1px'} borderColor='gray.300'>
                        <Button variant='solid' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button isLoading={loading} onClick={handlePay} colorScheme='teal'>Complete Payment</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
