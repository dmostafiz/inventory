import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import Axios from '../../../../Helpers/Axios'
import toasterHook from '../../../../Hooks/toasterHook'

export default function CancelSubscription() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading, setLoading] = useState(false)

    const router = useRouter()


    const toastMe = toasterHook()

    const handlePay = async () => {

        setLoading(true)
        const res = await Axios.post('/subscription/cancel')

        if (res?.data?.ok) {
            toastMe({ title: 'Subscription Canceled', description: 'Your subscription has been canceled successfully', status: 'success' })
            onClose()

            router.reload()

        }

        setLoading(false)

    }

    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme='red'>
                Cancel Subscription
            </Button>

            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderBottom={'1px'} borderColor='gray.300'>Cancel Subscription</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Text>You'll be restricted to use all of our extended features and the free plan will be activated once you cancel the subscription</Text>

                    </ModalBody>
                    <ModalFooter borderTop={'1px'} borderColor='gray.300'>
                        <Button variant='solid' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button isLoading={loading} onClick={handlePay} colorScheme='red'>Cancel Subscription</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
