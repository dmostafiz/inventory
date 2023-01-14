import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Switch, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'

import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toasterHook from '../../../../Hooks/toasterHook';
import { BusinessContext } from '../../../../Contexts/BusinessContext';

const schema = yup.object({

    firstName: yup.string()
        .required('This field is required!'),

    lastName: yup.string()
        .required('This field is required!'),

    email: yup.string()
        .email("Invalid Email!")
        .required('This field is required!'),

}).required();

export default function CreateStaffModal() {
    const { businessNotFound, hasBusiness } = useContext(BusinessContext)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const queryClient = useQueryClient()

    const toast = toasterHook()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    const submitData = async (value) => {

        alert(JSON.stringify(value))

        const res = await Axios.post('/user/create', { ...value })

        if (res?.data?.ok == true) {

            toast({
                title: 'Awesome!',
                description: 'Staff added successfully.',
                status: 'success'
            })

            await queryClient.refetchQueries({ queryKey: ['getUsers'] })

            onClose()
        }else{
            toast({
                title: 'Opps!',
                description: res?.data?.msg,
                status: 'success'
            })
 
        }

    }

    return (
        <>
            <Button onClick={hasBusiness() ? onOpen : businessNotFound} colorScheme={'teal'} variant='outline' size={'sm'}>Add Staff</Button>

            <Modal closeOnOverlayClick={false} size={{ base: 'sm', sm: 'lg', md: '2xl' }} isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />

                <ModalContent>

                    <ModalHeader borderBottom='2px' borderColor='gray.100' py={2}>Create Staff</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody pb={8}>

                        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }} spacingX={8} spacingY={4}>

                            <FormControl isInvalid={errors.firstName}>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter first name'
                                    {...register('firstName')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.firstName && errors.firstName.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.lastName}>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter last name'
                                    {...register('lastName')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.lastName && errors.lastName.message}
                                </FormErrorMessage>
                            </FormControl>


                            <FormControl isInvalid={errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter email address'
                                    {...register('email')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>

                        </SimpleGrid>

                    </ModalBody>

                    <ModalFooter borderTop='2px' borderColor='gray.100' py={2}>

                        <Button colorScheme='gray' onClick={onClose}>Cancel</Button>

                        <Button
                            ml={3}
                            colorScheme='teal'
                            onClick={handleSubmit(submitData)}
                            isLoading={isSubmitting}
                            loadingText='Creating...'
                        >
                            Create Staff
                        </Button>

                    </ModalFooter>

                </ModalContent>

            </Modal>
        </>
    )
}
