import { Box, Button, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Document, Page, PDFDownloadLink, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import { IconPhoto } from '@tabler/icons'
import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic';

import InvoiceData from '../Invoice/InvoiceData';
import InvoiceDataPDF from '../Invoice/InvoiceDataPDF';
import ReactToPrint from 'react-to-print';
import InvoiceHook from '../../../../Hooks/InvoiceHook';

// const InvoiceData = dynamic(() => import('../Invoice/InvoiceData'), { ssr: false });


export default function SalesInvoiceModalTest() {
    const { isOpen, onOpen, onClose, invoice } = InvoiceHook()

    const printRef = useRef();

    const invoiceData = {
        invoiceFor: 'Customer',
        id: invoice?.id,
        invoice_no: invoice?.refNo,
        balance: "$2,283.74",
        fullname: invoice?.customer?.prefix + '. ' + invoice?.customer?.firstName + ' ' + invoice?.customer?.lastName,
        email: invoice?.customer?.email,
        phone: invoice?.customer?.mobile,
        address: invoice?.customer?.addressOne + ', ' + invoice?.customer?.addressTwo + ', ' + invoice?.customer?.city + ', ' + invoice?.customer?.state + ', ' + invoice?.customer?.zipCode,
        trans_date: invoice?.invoiceData,
        due_date: invoice?.invoiceData,
        companyID: "10001",
        companyName: "xyz company",
        items: invoice?.sales?.map((item, i) => {
            return {
                sno: i + 1,
                desc: item?.product?.name,
                qty: item.quantity,
                rate: item.unitPrice,
            }
        }),
    }

    const fileName = `Invoice-${invoiceData.invoice_no}.pdf`;
    // console.log('PDF invoice', invoice);
    return (
        <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Invoice ({invoiceData?.invoice_no})</ModalHeader>
                <ModalCloseButton />
                <ModalBody>


                    <InvoiceData invoice={invoiceData} />

                    <Box hidden={true} >
                        <Box ref={printRef}>
                            <InvoiceDataPDF invoice={invoiceData} />
                        </Box>
                    </Box>

                </ModalBody>
                <ModalFooter>

                    <PDFDownloadLink
                        document={<InvoiceDataPDF invoice={invoiceData} />}
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
        </Modal>
    )
}
