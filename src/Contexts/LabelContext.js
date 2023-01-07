import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { createContext, useEffect, useRef, useState } from "react"
import Barcode from "react-barcode"
import ReactToPrint from "react-to-print"
import InvoiceData from "../Components/home/Dashboard/Invoice/InvoiceData"
import Axios from "../Helpers/Axios"
import { getAccessToken, removeAccessToken } from "../Helpers/cookieHelper"
// import useUser from "../Hooks/useUser"

export const LabelContext = createContext()

const LabelContextProvider = ({ children }) => {

    const printRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [products, setProducts] = useState(null)

    // const fileName = `Invoice-${invoiceData.invoice_no}.pdf`;

    useEffect(() => {

        console.log('Print label context', products)

        if (products?.length) {
            onOpen()
        }

    }, [products])

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
        </Modal>}

    </LabelContext.Provider>
}

export default LabelContextProvider
