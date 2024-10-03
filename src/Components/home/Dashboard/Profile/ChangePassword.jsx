import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, SimpleGrid, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useRouter } from 'next/router';


const schema = yup.object({

    currentPassword: yup.string()
    .required('This field is required!')
    .min(6, 'Minimum 6 character is allowed'),

    password: yup.string()
        .required('This field is required!')
        .min(6, 'Minimum 6 character is allowed'),

    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Confirm password should be match with new password')
        .required('Confirm password field is required!')

}).required();


export default function ChangePassword() {

    const toast = useToast()
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    async function onSubmit(value) {
        console.log('Form Value', value)
        const res = await Axios.post('/profile/password', { ...value })
        // await submitRegistrationData('/auth/signUp', values)

        toast({
            title: 'Done!',
            description: 'You have just updated your password.',
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
                <FormControl id="password" isInvalid={errors.currentPassword} isRequired>
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter current password'
                            {...register('currentPassword')}
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                    setShowPassword((showPassword) => !showPassword)
                                }>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.currentPassword && errors.currentPassword.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl id="password" isInvalid={errors.password} isRequired>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Re-type the password'
                            {...register('password')}
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                    setShowPassword((showPassword) => !showPassword)
                                }>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl id="password" isInvalid={errors.confirmPassword} isRequired>
                    <FormLabel>Re-type Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Re-type the password'
                            {...register('confirmPassword')}
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                    setShowPassword((showPassword) => !showPassword)
                                }>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </FormErrorMessage>
                </FormControl>

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
                    Change Password
                </Button>
            </Box>
        </Box>
    )
}
