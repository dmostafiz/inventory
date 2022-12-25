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

    status: yup.string()
        .required('Status is required!'),

}).required();

export default function CreateBrandModal() {

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
    
    const [description, setDescription] = useState('')

    const submitData = async (value) => {

        const res = await Axios.post('/brand/create', { ...value, description })

        if (res?.data?.ok == true) {

            toast({
                title: 'Awesome!',
                description: 'Brand created successfully.',
                status: 'success'
            })

            await queryClient.refetchQueries({ queryKey: ['getBrands'] })


            setDescription('')
     
            onClose()
        }

    }

    return (
        <>
            <Button onClick={onOpen} colorScheme={'teal'} variant='outline' size={'sm'}>Create Brand</Button>

            <Modal closeOnOverlayClick={false} size={{ base: 'sm', sm: 'lg', md: '2xl' }} isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />

                <ModalContent>

                    <ModalHeader borderBottom='2px' borderColor='gray.100' py={2}>Create Brand</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody pb={8}>

                        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }} spacingX={8} spacingY={4}>

                            <FormControl isInvalid={errors.name}>
                                <FormLabel>Brand Name</FormLabel>
                                <Input
                                    size={'sm'}
                                    type='text'
                                    focusBorderColor='#00B29E'
                                    placeholder='Enter brand name'
                                    {...register('name')}
                                />
                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.status}>
                                <FormLabel>Status</FormLabel>

                                <Select
                                    size={'sm'}
                                    placeholder='Select status'
                                    focusBorderColor='#00B29E'
                                    {...register('status')}
                                >
                                    <option value='yes'>Active</option>
                                    <option value='no'>Inactive</option>
                                </Select>

                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                <FormErrorMessage>
                                    {errors.status && errors.status.message}
                                </FormErrorMessage>
                            </FormControl>

                        </SimpleGrid>


                        <FormControl mt={4}>
                            <FormLabel>Description (Optional)</FormLabel>

                            <Textarea
                                focusBorderColor='#00B29E'
                                placeholder='Enter brand description'
                                onChange={e => setDescription(e.target.value)}
                            />

                            {/* <FormErrorMessage>
                                {errors.status && errors.status.message}
                            </FormErrorMessage> */}
                        </FormControl>

                        {/* <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }} spacingX={8} spacingY={4} mt={4}>

                            <FormControl as={Flex} alignItems='center' gap={3}>
                                <Switch
                                    id='isChecked'
                                    onChange={() => setSubCategory(!subCategory)}
                                />
                                <FormLabel htmlFor='isChecked' mb='0'>this is a submenu</FormLabel>
                            </FormControl>

                            {subCategory && <FormControl>
                                <FormLabel>Select main category</FormLabel>

                                <Select
                                    size={'sm'}
                                    placeholder='Select status'
                                    focusBorderColor='#00B29E'
                                    onChange={e => setMainCategory(e.target.value)}
                                >
                                    {data?.categories?.map((cat, index) => <option key={index} value={cat.id}>{cat.name}</option>)}
                                </Select>
                            </FormControl>}

                        </SimpleGrid> */}



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
                            Create Brand
                        </Button>

                    </ModalFooter>

                </ModalContent>

            </Modal>
        </>
    )
}
