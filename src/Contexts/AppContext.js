import { createContext, useEffect, useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
// import usePostAction from "../Hooks/usePostAction";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [authUser, setAuthUser] = useState(null)

    const [title, setTitle] = useState('')
    const [description, seDescription] = useState('')
    const [button, seButtonText] = useState('')
    const [action, setAction] = useState(false)

    const [loading, setLoading] = useState(false)


    const { isOpen, onOpen, onClose } = useDisclosure()

    // const {action} = usePostAction()

    return <AppContext.Provider value={{
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
        setTitle,
        seDescription,
        seButtonText,
        setAction,
        action,
        setLoading
    }}>
        {children}

        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
        
        >
            <AlertDialogOverlay zIndex={9999}>
                <AlertDialogContent zIndex={999999}>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                       {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {description}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                        <Button isLoading={loading} onClick={() => setAction(true)} colorScheme='red' ml={3}>
                            {button}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

    </AppContext.Provider>

}

export default AppContextProvider