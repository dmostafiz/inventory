import { useDisclosure } from '@chakra-ui/react'
import React from 'react'

export default function InvoiceHook() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [invoice, getInvoice] = React.useState(null)

    const setInvoice = (invoice) => {

        getInvoice(invoice)

        onOpen()
    }

    return { isOpen, onClose, invoice, setInvoice }
}
