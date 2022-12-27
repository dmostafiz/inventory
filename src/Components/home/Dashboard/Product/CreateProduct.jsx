import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, SimpleGrid, useToast } from '@chakra-ui/react'
import React from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@mantine/core';

const schema = yup.object({

    name: yup.string()
        .required('This field is required!'),

    sku: yup.string(),

    unitId: yup.string()
        .required('This field is required'),

    city: yup.string()
        .required('This field is required'),

    state: yup.string()
        .required('This field is required'),

    zip: yup.string()
        .required('This field is required'),

}).required();

export default function CreateProduct() {

    const queryClient = useQueryClient()

    const toast = useToast()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const submitNow = async (value) => {
        const res = await Axios.post('/product/create', { ...value })

        if (res.data.ok) {

            await queryClient.refetchQueries({ queryKey: ['myBusinesses'] })

            toast({
                title: 'Congratulations!',
                description: 'You have just created your business.',
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Ooppss!',
                description: 'Something went wrong! please try again later.',
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <Box w={'full'} p={3}>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacingX={8} spacingY={4}>

                <FormControl isRequired isInvalid={errors.name}>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter product name'
                        {...register('name')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.sku}>
                    <FormLabel>SKU (optional)</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Ex: SKU-10001'
                        {...register('sku')}
                    />
                    <FormHelperText>Leave empty to generate automatically.</FormHelperText>
                    <FormErrorMessage>
                        {errors.sku && errors.sku.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl isInvalid={errors.unitId}>
                    <FormLabel>Status</FormLabel>

                    <Select
                        size={'sm'}
                        placeholder='Select status'
                        focusBorderColor='#00B29E'
                        {...register('unitId')}
                    >
                        <option value='yes'>Active</option>
                        <option value='no'>Inactive</option>
                    </Select>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.unitId && errors.unitId.message}
                    </FormErrorMessage>

                </FormControl>


                <FormControl isInvalid={errors.city}>
                    <FormLabel>City</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter business city'
                        {...register('city')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.city && errors.city.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.state}>
                    <FormLabel>State</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter business state'
                        {...register('state')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.state && errors.state.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl isInvalid={errors.zip}>
                    <FormLabel>Zip Code</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        placeholder='Enter business zip code'
                        focusBorderColor='#00B29E'
                        {...register('zip')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.zip && errors.zip.message}
                    </FormErrorMessage>
                </FormControl>

                <Box pt={4}>
                    <Button
                        colorScheme={'teal'}
                        isLoading={isSubmitting}
                        loadingText={'Creating....'}
                        onClick={handleSubmit(submitNow)}
                    >
                        Create Business
                    </Button>
                </Box>


            </SimpleGrid>
        </Box>
    )
}
