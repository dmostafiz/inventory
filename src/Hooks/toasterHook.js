import { useToast } from '@chakra-ui/react'
import React from 'react'

export default function toasterHook() {

    const toast = useToast()

    const toastMe = ({title = '', description = '', status='success'}) => {
        toast({
            title: title,
            description: description,
            status: status,
            position: 'top-right',
            duration: 9000,
            isClosable: true,
        })

    }

    return toastMe
}
