import React, { useState } from 'react'
import Axios from '../Helpers/Axios'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { setFlashMessage } from '../Helpers/cookieHelper';
import Cookies from 'js-cookie';


const schema = yup.object({
    email: yup.string()
        .email("Invalid Email!")
        .required('Email field is required!')
        .test(
            'checkEmailUnique',
            'The email is already in use',
            async (value) => {
                const res = await Axios.post(`/user/check_user_exists`, { by: 'email', value }, {
                    withCredentials: true,
                })

                if (res?.data?.ok === true) {
                    return false
                }

                return true
            }
        ),

    firstName: yup.string()
        .required('First Name field is required!'),

    lastName: yup.string()
        .required('Last Name field is required!'),

    password: yup.string()
        .required('Password field is required!')
        .min(6, 'Minimum 6 character is allowed'),

    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Confirm password should be match with new password')
        .required('Confirm password field is required!')

}).required();

export default function useRegistration() {

    const router = useRouter()
    const toast = useToast()

    const [googleLoading, setGoogleLoading] = useState(false)
    const [fbLoading, setFbLoading] = useState(false)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const responseFacebook = async (response) => {

        console.log('FaceBook Signup ', response)

        setFbLoading(true)

        if (response?.email) {
            await submitRegistrationData(
                '/auth/social_signup',
                {
                    email: response?.email,
                    avatar: response?.picture?.data?.url,
                    host: 'facebook'
                }
            )
        }

        setFbLoading(false)
    }

    const responseGoogle = async (response) => {

        const obj = response.profileObj

        console.log(obj)

        setGoogleLoading(true)

        if (obj) {
            await submitRegistrationData(
                '/auth/social_signup',
                {
                    email: obj?.email,
                    avatar: obj?.imageUrl,
                    host: 'google'
                }
            )
        }

        setGoogleLoading(false)

    }

    async function onSubmit(values) {
        console.log('Form Value', values)
        await submitRegistrationData('/auth/signUp', values)
    }

    const submitRegistrationData = async (url, values) => {
        const res = await Axios.post(url, { ...values }, {
            // withCredentials: true
        })

        // console.log(res)

        if (res?.data.ok == true) {

            Cookies.set('accessToken', res.data.accessToken)

            // removeUpdateToken(data.profileUpdateToken)
            // setRedirectUrl(router.asPath)

            toast({
                title: 'Congratulations!',
                description: "Your registration has done successfully.",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            setFlashMessage('success', "Congratulations!", "Your registration has done successfull.",)

            window.location.href = '/home'

            return

        } else {
            toast({
                title: 'Sorry!',
                description: res?.data?.msg ?? 'There is a problem! Please try again later',
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            return
        }

    }


    return { responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting, fbLoading, googleLoading }
}