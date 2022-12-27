import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Switch, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toasterHook from '../../../../Hooks/toasterHook';

const schema = yup.object({

    name: yup.string()
        .required('Name field is required!'),

    rate: yup.number()
        .required('Tax is required!'),

}).required();

export default function CreateTaxModal() {

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

        const res = await Axios.post('/tax/create', { ...value })

        if (res?.data?.ok == true) {

            toast({
                title: 'Awesome!',
                description: 'Tax rate created successfully.',
                status: 'success'
            })

            await queryClient.refetchQueries({ queryKey: ['getTaxes'] })

            onClose()
        }

    }

    return (
        <>
            <Button onClick={onOpen} colorScheme={'teal'} variant='outline' size={'sm'}>Create Tax</Button>

            <Modal closeOnOverlayClick={false} size={{ base: 'sm', sm: 'lg', md: '2xl' }} isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />

                <ModalContent>

                    <ModalHeader borderBottom='2px' borderColor='gray.100' py={2}>Create Tax</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody pb={8}>

                        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }} spacingX={8} spacingY={4}>

                            <FormControl isInvalid={errors.name}>
                                <FormLabel>Tax Name</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter tax name'
                                    {...register('name')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.rate}>
                                <FormLabel>Tax Rate (%)</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='number'
                                    defaultValue={10}
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter tax rate'
                                    {...register('rate')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.rate && errors.rate.message}
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
                            Create Tax
                        </Button>

                    </ModalFooter>

                </ModalContent>

            </Modal>
        </>
    )
}
