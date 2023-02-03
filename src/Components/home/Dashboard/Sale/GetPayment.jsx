import { Box, Button, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { SegmentedControl } from '@mantine/core'
import React, { useState } from 'react'
import NfcAnimation from './NfcAnimation'

export default function GetPayment({ customer, total }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [paymentType, setPaymentType] = useState('cash')

    return (
        <>
            <Button onClick={onOpen} colorScheme={'teal'}>Get Paid</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderBottom='1px' borderColor={'gray.300'}>Get Payment</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box pb={3} borderBottom='1px' borderColor={'gray.300'}>
                            <Text><b>Customer:</b> {customer.prefix}. {customer.firstName} {customer.middleName} {customer.lastName}</Text>
                            <Text><b>Charging amount:</b> {total}</Text>
                        </Box>

                        <Box py={2}>
                            <SegmentedControl
                                data={[
                                    { label: 'Cash on hand', value: 'cash' },
                                    { label: 'NFC Payment', value: 'nfc' },
                                ]}

                                value={paymentType}
                                onChange={setPaymentType}
                            />
                        </Box>

                        <Box pt={3}>
                            {paymentType == 'nfc' ? <>
                                <Heading fontSize={'14px'} as='h6'>Scan NFC card/tag with POS machine</Heading>
                                <NfcAnimation />
                            </>
                                : <>
                                    <Heading fontSize={'14px'} as='h6'>Collect cash from the customer</Heading>
                                    <Image src='https://png.pngtree.com/png-vector/20221106/ourmid/pngtree-smiling-young-man-holding-pile-of-cash-in-hands-png-image_6421080.png' />
                                </>}
                        </Box>

                    </ModalBody>

                    <ModalFooter borderTop='1px' borderColor={'gray.300'}>
                        <Button colorScheme='gray' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button disabled={paymentType == 'nfc'} colorScheme='teal'>Payment Done</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
