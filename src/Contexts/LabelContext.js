import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { createContext, useEffect, useRef, useState } from "react"
// import Barcode from "react-barcode"
import Barcode from 'react-jsbarcode';
import ReactToPrint from "react-to-print"
// import useUser from "../Hooks/useUser"

export const LabelContext = createContext()

const LabelContextProvider = ({ children }) => {

    const printRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [products, setProducts] = useState(null)

    // const fileName = `Invoice-${invoiceData.invoice_no}.pdf`;

    useEffect(() => {

        // console.log('Print label context', products)

        if (products?.length) {
            onOpen()
        }

    }, [products])

    const handleClose = () => {
        setProducts(null)
        onClose()
    }

    return <LabelContext.Provider value={{
        setProducts
    }}>

        {children}

        {products && <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom={'1px'} borderColor='gray.300'>
                    Product Labels
                    <Text fontSize={'12px'} fontWeight='normal'>Total labels: {products.reduce((totalQty, c) => {
                        return totalQty + +c.qty
                    }, 0)}</Text>
                </ModalHeader>
                {/* <ModalCloseButton /> */}
                <ModalBody>

                    <Box w='full' maxH={'50vh'} overflowY={'auto'}>
                        <VStack ref={printRef}>
                            {
                                products.map((product, index) => {
                                    return <Box key={index}>
                                        {
                                            [...Array(+product.qty).keys()].map((p, i) => {
                                                return <Box key={index + i} p={'0px'} border='1px' mb={'2px'}>
                                                    <VStack spacing={-1}>
                                                        <Text fontSize={'14px'} fontWeight={'bold'}>{product.name}</Text>
                                                        <Text fontSize={'10px'}>Brand: {product?.brand?.name} | MRP: {product?.sellingPriceIncTax}</Text>
                                                        <Barcode
                                                            value={product.sku}
                                                            width={1.5}
                                                            // text={product.sku}
                                                            // fontSize={10}
                                                            height={40}
                                                            options={
                                                                {
                                                                    format: 'code128',
                                                                    height: 40,
                                                                    width: 1.5
                                                                }}
                                                            renderer="svg"
                                                        />
                                                    </VStack>
                                                    <div className="page-break" />
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
                    <Button mr={3} onClick={handleClose}>
                        Cancel
                    </Button>
                    <ReactToPrint
                        trigger={() => <Button colorScheme='teal'>Print labels</Button>}
                        content={() => printRef.current}
                    />

                </ModalFooter>
            </ModalContent>
        </Modal>}

    </LabelContext.Provider>
}

export default LabelContextProvider
