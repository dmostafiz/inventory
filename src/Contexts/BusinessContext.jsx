import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "./AuthContext"


export const BusinessContext = createContext()

const BusinessContextProvider = ({ children }) => {

    const router = useRouter()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { authUser } = useContext(AuthContext)

    const hasBusiness = () => {
        if (authUser?.businesses?.length) {
            return true
        }

        else {
            return false
        }

    }

    const businessNotFound = () => {

        onOpen()
    }

    const handleRedirect = () => {
        router.push('/home/settings/business')
        onClose()
    }

    return <BusinessContext.Provider value={{
        hasBusiness,
        businessNotFound
    }}>

        {children}

        <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom='1px' borderColor={'gray.200'}>Business Not found!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Business not found! you cannot do anything until you create your business information!</Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr='2'>Cancel</Button>
                    <Button onClick={handleRedirect} colorScheme={'teal'}>Create Business</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </BusinessContext.Provider>
}

export default BusinessContextProvider
