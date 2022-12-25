import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Contexts/AppContext'
// import { AuthModalContext } from '../Contexts/AuthModalContext'
import Axios from '../Helpers/Axios'
import { setRedirectUrl } from '../Helpers/cookieHelper'
import useUser from './useUser'

export default function useAppActions() {
    const router = useRouter()
    const toast = useToast()
    const { authUser } = useUser()
    const { onOpen, onClose, setLoading, action, setAction, seDescription, setTitle, seButtonText } = useContext(AppContext)
    // const authModal = useContext(AuthModalContext)
    const queryClient = useQueryClient()

    const [url, setUrl] = useState(null)
    const [id, setId] = useState(null)
    const [type, setType] = useState(null)

    const [toastTitle, setToastTitle] = useState('')
    const [toastType, setToastType] = useState('')
    const [refetchKies, setRefetchKies] = useState([])

    const deleteAction = ({
        url,
        id,
        title = 'Delete Now!',
        description = 'Do you want to delete this?',
        toastTitle='Successfully deleted!',
        toastType='success',
        buttonText='Delete now',
        refetchKies=[]
    }) => {
        setType('delete')
        setUrl(url)
        setId(id)
        setTitle(title)
        seDescription(description)
        seButtonText(buttonText)
        setToastTitle(toastTitle)
        setToastType(toastType)
        setRefetchKies(refetchKies)
        onOpen()
    }


    useEffect(() => {

        if (action === true && url && id) {

            setLoading(true)

            async function triggerAction() {

                const res = await Axios.post(url, {
                    id: id
                })

                if (res?.data?.ok) {
                    // alert('সফল হয়েছেন')
                    // queryClient.fetchQuery({ queryKey: ['publishedPosts', 'trashedPosts'] })

                    if (type == 'delete') {
                        toast({
                            title: toastTitle,
                            status: toastType,
                            duration: 9000,
                            isClosable: true,
                        })

                        setType(null)
                        setToastTitle(null)
                        setToastType(null)
                    }
                    await queryClient.refetchQueries({ queryKey: refetchKies })
                }

                setUrl(null)
                setId(null)
                setLoading(false)

                onClose()
            }

            triggerAction()

        }

        setAction(false)

    }, [action])


    return { deleteAction }
}