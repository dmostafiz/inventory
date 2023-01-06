import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { createContext, useEffect, useRef, useState } from "react"
import ReactToPrint from "react-to-print"
import InvoiceData from "../Components/home/Dashboard/Invoice/InvoiceData"
import Axios from "../Helpers/Axios"
import { getAccessToken, removeAccessToken } from "../Helpers/cookieHelper"
// import useUser from "../Hooks/useUser"

export const InvoiceContext = createContext()

const InvoiceContextProvider = ({ children }) => {

    const printRef = useRef();


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [invoice, setInvoice] = useState(null)
    const [invoiceData, setInvoiceData] = useState(null)
    const [fileName, setFileName] = useState(null)

    useEffect(() => {

        if (invoice !== null) {

            const user = invoice.type == 'sale' ? invoice.customer : invoice.supplier
            const items = invoice.type == 'sale' ? invoice?.sales : invoice?.purchases

            setInvoiceData({
                invoiceFor: invoice?.type == 'sale' ? 'Customer' : 'Supplier',
                id: invoice?.id,
                invoice_no: invoice?.refNo,
                balance: "$2,283.74",
                fullname: user?.prefix + '. ' + user?.firstName + ' ' + user?.lastName,
                email: user?.email,
                phone: user?.mobile,
                address: user?.addressOne + ', ' + user?.addressTwo + ', ' + user?.city + ', ' + user?.state + ', ' + user?.zipCode,
                trans_date: invoice?.invoiceData,
                due_date: invoice?.invoiceData,
                business: invoice?.business,
                items: items?.map((item, i) => {
                    return {
                        sno: i + 1,
                        desc: item?.product?.name,
                        qty: item.quantity,
                        rate: ((item.unitPrice * item.taxRate) / 100) + item.unitPrice,
                    }
                }),
            })

            setFileName(`Invoice-${invoice.refNo}.pdf`)
            onOpen()
        }

    }, [invoice])

    // const fileName = `Invoice-${invoiceData.invoice_no}.pdf`;


    return <InvoiceContext.Provider value={{
        setInvoice
    }}>

        {children}

        {invoiceData && <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom='1px' borderColor={'gray.200'}>Invoice (#{invoiceData?.invoice_no})</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

             
                        <Box ref={printRef}>
                            <InvoiceData invoice={invoiceData} />
                        </Box>
                  
                </ModalBody>
                <ModalFooter>

                    <PDFDownloadLink
                        document={<InvoiceData invoice={invoiceData} />}
                        fileName={fileName}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? "Loading..." : <Button size='sm' colorScheme='gray' mr={3}>
                                Download PDF
                            </Button>
                        }
                    </PDFDownloadLink>


                    <ReactToPrint
                        trigger={() => <Button size='sm' colorScheme='blue' mr={3}>
                            Print Invoice
                        </Button>}
                        content={() => printRef.current}
                    />

                    {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Print
                        </Button> */}
                    {/* <Button variant='ghost'>Secondary Action</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>}

    </InvoiceContext.Provider>
}

export default InvoiceContextProvider
