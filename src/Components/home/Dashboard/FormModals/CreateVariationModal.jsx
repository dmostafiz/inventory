import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toasterHook from '../../../../Hooks/toasterHook';
import { useEffect } from 'react';

const schema = yup.object({

    name: yup.string()
        .required('Name field is required!'),

    status: yup.string()
        .required('Status is required!'),

}).required();


export default function CreateVariationModal() {

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



    const [arrayFields, setArrayFields] = useState([{
        id: 1,
        value: ""
    }]);

    useEffect(() => {
        console.log('Array fields', arrayFields)
    }, [arrayFields])

    const addInput = () => {
        setArrayFields(s => {
            return [
                ...s,
                {
                    id: +arrayFields.pop().id + 1,
                    value: ""
                }
            ];
        });
    };

    const removeInput = (id) => {
        // alert(id)
        setArrayFields(arrayFields.filter(inpt => inpt.id !== id));
    };



    const handleChange = e => {

        e.preventDefault();

        const index = e.target.id;

        setArrayFields(s => {

            const newArr = s.slice();

            newArr[index].value = e.target.value;

            return newArr;
        });
    }

    const submitData = async (value) => {

        const mappedArray = arrayFields.map(af => {
            if (af.value != '') {
                return af.value
            }
        })

        const values = mappedArray.filter(function( element ) {
            return element !== undefined;
         });

        const data = {
            ...value, values 
        }

        console.log('Variation store data', data)

        const res = await Axios.post('/variation/create', data)

        if (res?.data?.ok == true) {

            toast({
                title: 'Awesome!',
                description: 'Variation created successfully.',
                status: 'success'
            })

            await queryClient.refetchQueries({ queryKey: ['getVariation'] })


            onClose()
        }

    }


    return (
        <>
            <Button onClick={onOpen} colorScheme={'teal'} variant='outline' size={'sm'}>Create Variation</Button>
            <Modal closeOnOverlayClick={false} size={{ base: 'sm', sm: 'lg', md: '2xl' }} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>

                    <ModalHeader borderBottom='2px' borderColor='gray.100' py={2}>Create Variation</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody pb={8}>

                        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2 }} spacingX={8} spacingY={4}>

                            <FormControl isInvalid={errors.name}>
                                <FormLabel>Variation Name</FormLabel>
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


                        <Box py={5}>
                            <FormControl>
                                <FormLabel>Variation values (xl, md, sm)</FormLabel>
                                {arrayFields.map((item, i) => {
                                    return (
                                        <Flex key={i} gap={2} mb={2}>
                                            <Input
                                                onChange={handleChange}
                                                value={item.value}
                                                id={i}
                                                type='text'
                                                size='sm'
                                                placeholder='Enter variation value'
                                                isRequired={true}
                                            />
                                            {((i + 1) == arrayFields.length)
                                                ? <Button colorScheme={'green'} size='sm' onClick={addInput}>+</Button>
                                                : <Button colorScheme={'red'} size='sm' onClick={() => removeInput(item.id)}>-</Button>}
                                        </Flex>
                                    );
                                })}
                            </FormControl>

                        </Box>



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
                            Create Variation
                        </Button>

                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}
