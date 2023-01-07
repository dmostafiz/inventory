import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useRef } from 'react'
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';

export default function PrintLabelsModal({ products }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const printRef = useRef();


    console.log('Print labels product', products)

    return (
        <>
            <Button colorScheme={'teal'} onClick={onOpen}>Preview Labels</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderBottom={'1px'} borderColor='gray.300'>Product Labels</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Box w='full' maxH={'50vh'} overflowY={'auto'}>
                            <VStack ref={printRef}>
                                {
                                    products.map((product, index) => {
                                        return <Box key={index}>
                                            {
                                                [...Array(+product.qty).keys()].map((p, i) => {
                                                    return <Box key={index + i} p={'2px'} border='1px' mb={3}>
                                                        <VStack spacing={0}>
                                                            <Text fontWeight={'bold'}>{product.name}</Text>
                                                            <Text fontSize={'12px'}>Brand: {product?.brand?.name} | MRP: {product?.sellingPriceIncTax}</Text>
                                                            <Barcode
                                                                value={product.sku}
                                                                width={1.8}
                                                                text={product.sku}
                                                                fontSize={'12px'}
                                                                height='40px'
                                                            />
                                                        </VStack>
                                                    </Box>
                                                })
                                            }
                                        </Box>

                                    })
                                }
                            </VStack>
                        </Box>



                    </ModalBody>
                    <ModalFooter borderTop={'1px'} borderColor='gray.300'>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <ReactToPrint
                            trigger={() => <Button colorScheme='teal'>Print labels</Button>}
                            content={() => printRef.current}
                        />

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}
