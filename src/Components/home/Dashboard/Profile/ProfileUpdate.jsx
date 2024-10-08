import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, SimpleGrid, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useRouter } from 'next/router';
import useUser from '../../../../Hooks/useUser';

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



}).required();


export default function ProfileUpdate() {

    const { isError, error, authUser, isLoading, logoutUser } = useUser()


    const router = useRouter()
    const toast = useToast()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            firstName: authUser?.firstName,
            lastName: authUser?.lastName,
            email: authUser?.email
        }
    })


    async function onSubmit(value) {
        console.log('Form Value', value)
        // await submitRegistrationData('/auth/signUp', values)
        const res = await Axios.post('/profile/update', { ...value })
        // await submitRegistrationData('/auth/signUp', values)

        toast({
            title: 'Done!',
            description: 'You have just updated your profile info.',
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
        })

        router.reload()
    }

    return (
        <Box>
            <SimpleGrid columns={[1, 2, 2, 3]} gap={3}>
                <Box>
                    <FormControl id="firstName" isInvalid={errors.firstName} isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            type="text"
                            placeholder='Enter your first name'
                            {...register('firstName')}
                        />
                        <FormErrorMessage>
                            {errors.firstName && errors.firstName.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="lastName" isInvalid={errors.lastName} isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            type="text"
                            placeholder='Enter your last name'
                            {...register('lastName')}
                        />
                        <FormErrorMessage>
                            {errors.lastName && errors.lastName.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="email" isInvalid={errors.email} isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            placeholder='Enter your email address!'
                            {...register('email')}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
            </SimpleGrid>


            <Box spacing={10} pt={5}>
                <Button
                    loadingText="Submitting"
                    size="lg"
                    colorScheme={'teal'}
                    color={'white'}
                    _hover={{
                        bg: 'turquoise',
                    }}

                    isLoading={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                >
                    Update profile information
                </Button>
            </Box>
        </Box>
    )
}
