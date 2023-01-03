import { Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Switch, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toasterHook from '../../../../Hooks/toasterHook';

const schema = yup.object({

    prefix: yup.string()
        .required('Prefix field is required!'),


    firstName: yup.string()
        .required('First name field is required!'),

    middleName: yup.string(),

    lastName: yup.string()
        .required('Last name field is required!'),

    mobile: yup.string()
        .required('Mobile field is required!'),

    alternativeMobile: yup.string(),

    landLine: yup.string(),

    email: yup.string(),

    taxNumber: yup.string(),

    addressOne: yup.string()
        .required('Address line one field is required!'),


    addressTwo: yup.string(),

    city: yup.string()
        .required('City field is required!'),

    state: yup.string()
        .required('State field is required!'),

    country: yup.string()
        .required('Country field is required!'),

    zipCode: yup.string()
        .required('zip code field is required!'),


    description: yup.string(),


}).required();

export default function CreateCustomer({ setCustomerId = null}) {

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

        const res = await Axios.post('/customer/create', { ...value })

        if (res?.data?.ok == true) {


            toast({
                title: 'Awesome!',
                description: 'Customer created successfully.',
                status: 'success'
            })

            await queryClient.refetchQueries({ queryKey: ['getCustomers'] })
            await queryClient.refetchQueries({ queryKey: ['getCustomers1'] })

            if (setCustomerId != null) {
                setCustomerId(res?.data?.customer?.id)
            }

            onClose()
        }

    }

    return (
        <>
            <Button onClick={onOpen} colorScheme={'teal'} variant='outline' size={'sm'}>Create Customer</Button>

            <Modal closeOnOverlayClick={false} size={{ base: 'sm', sm: 'lg', md: '2xl', lg: '6xl' }} isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />

                <ModalContent>

                    <ModalHeader borderBottom='2px' borderColor='gray.100' py={2}>Create Customer</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody pb={8}>

                        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 4 }} spacingX={8} spacingY={4}>

                            <FormControl isRequired isInvalid={errors.prefix}>
                                <FormLabel>Prefix</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Mr / Mrs / Miss'
                                    {...register('prefix')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.prefix && errors.prefix.message}
                                </FormErrorMessage>
                            </FormControl>


                            <FormControl isRequired isInvalid={errors.firstName}>
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


                            <FormControl isInvalid={errors.middleName}>
                                <FormLabel>Middle Name (Optional)</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter middle name'
                                    {...register('middleName')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.middleName && errors.middleName.message}
                                </FormErrorMessage>
                            </FormControl>


                            <FormControl isRequired isInvalid={errors.lastName}>
                                <FormLabel>Last Name</FormLabel>
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


                            <FormControl isRequired isInvalid={errors.mobile}>
                                <FormLabel>Mobile</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter mobile number'
                                    {...register('mobile')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.mobile && errors.mobile.message}
                                </FormErrorMessage>
                            </FormControl>


                            <FormControl isInvalid={errors.alternativeMobile}>
                                <FormLabel>Alternative contact (Optional)</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter alternative contact number'
                                    {...register('alternativeMobile')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.alternativeMobile && errors.alternativeMobile.message}
                                </FormErrorMessage>
                            </FormControl>


                            <FormControl isInvalid={errors.landLine}>
                                <FormLabel>Landline (Optional)</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter alternative contact number'
                                    {...register('landLine')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.landLine && errors.landLine.message}
                                </FormErrorMessage>
                            </FormControl>


                            <FormControl isInvalid={errors.email}>
                                <FormLabel>Email (Optional)</FormLabel>
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

                        <Divider my={4} />

                        <Heading as='h6' fontSize={'16px'} mb={4}>Shipping address</Heading>


                        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }} spacingX={8} spacingY={4} mb={4}>

                            <FormControl isRequired isInvalid={errors.addressOne}>
                                <FormLabel>Address line 1</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter address line 1'
                                    {...register('addressOne')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.addressOne && errors.addressOne.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.addressTwo}>
                                <FormLabel>Address line 2 (Optional)</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter address line 2'
                                    {...register('addressTwo')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.addressTwo && errors.addressTwo.message}
                                </FormErrorMessage>
                            </FormControl>

                        </SimpleGrid>

                        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 4 }} spacingX={8} spacingY={4}>

                            <FormControl isRequired isInvalid={errors.city}>
                                <FormLabel>City</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter city'
                                    {...register('city')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.city && errors.city.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.state}>
                                <FormLabel>State</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter state'
                                    {...register('state')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.state && errors.state.message}
                                </FormErrorMessage>
                            </FormControl>


                            <FormControl isRequired isInvalid={errors.country}>
                                <FormLabel>Country</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter country'
                                    {...register('country')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.country && errors.country.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.zipCode}>
                                <FormLabel>Zip Code</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter zip code'
                                    {...register('zipCode')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.zipCode && errors.zipCode.message}
                                </FormErrorMessage>
                            </FormControl>

                        </SimpleGrid>


                        <FormControl mt={4} isInvalid={errors.description}>
                            <FormLabel>Description (Optional)</FormLabel>

                            <Textarea
                                focusBorderColor='#00B29E'
                                placeholder='Enter customer description'
                                {...register('description')}
                            />

                            <FormErrorMessage>
                                {errors.description && errors.description.message}
                            </FormErrorMessage>
                        </FormControl>


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
                            Create Customer
                        </Button>

                    </ModalFooter>

                </ModalContent>

            </Modal>
        </>
    )
}
