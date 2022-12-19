import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import Axios from '../Helpers/Axios'
import { getRedirectUrl, setAccessToken, setFlashMessage, setRedirectUrl } from '../Helpers/cookieHelper'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

const schema = yup.object({

    email: yup.string()
        .required('Email field is required!'),

    password: yup.string()
        .required('Password field is required'),

}).required();

export default function useLogin(redirectUrl = null) {

    const toast = useToast()
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    const [googleLoading, setGoogleLoading] = useState(false)
    const [fbLoading, setFbLoading] = useState(false)


    const responseFacebook = async (response) => {

        console.log('FaceBook Signup ', response)


        setFbLoading(true)


        if (response?.email) {

            await submitLoginData('/auth/social_signin', {
                email: response?.email

            })
        }

        setFbLoading(false)
    }

    const responseGoogle = async (response, errorNotify = true) => {

        setGoogleLoading(true)

        const obj = response.profileObj

        if (obj) {

            const loginStatus = await submitLoginData('/auth/social_signin', {
                email: obj?.email

            }, errorNotify)

            setGoogleLoading(false)

            return loginStatus
        }
        else {
            setGoogleLoading(false)
            return false
        }


    }

    async function onSubmit(values) {
        await submitLoginData('/auth/signIn', values)
    }


    async function submitLoginData(url, values, errorNotify = true) {

        if (redirectUrl) {
            setRedirectUrl(redirectUrl)
        }

        // console.log('login values sdsd', values)

        const res = await Axios.post(url, values)

        console.log('Response ', res?.data)

        if (res?.data?.ok) {



            toast({
                title: 'Welcome!',
                // description: "ব্লগে আপনাকে স্বাগতম।",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            setAccessToken(res?.data?.accessToken)

            // setFlashMessage('success', "ব্লগে আপনাকে স্বাগতম!", "")

            const redirectUrl = getRedirectUrl()


            if(redirectUrl){
                return window.location.href = redirectUrl
                // router.push('/home')

            }

            else{
                window.location.href = '/home'
                // router.push('/home')
            }

        }

        if (!res?.data?.ok) {

            if (errorNotify) {

                toast({
                    title: 'Oppsss!',
                    description: res?.data?.msg ?? 'There is a problem! please try again later.',
                    status: 'error',
                    position: 'top-right',
                    duration: 9000,
                    isClosable: true,
                })

            }


            return false

        }
    }


    return { responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting, googleLoading, fbLoading }
}