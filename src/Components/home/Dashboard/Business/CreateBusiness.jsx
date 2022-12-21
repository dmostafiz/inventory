import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, SimpleGrid, useToast } from '@chakra-ui/react'
import React from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useQueryClient } from '@tanstack/react-query';

const schema = yup.object({

    name: yup.string()
        .required('Name field is required!'),

    contact: yup.string()
        .required('Contact field is required'),

    location: yup.string()
        .required('Location field is required'),

    city: yup.string()
        .required('City field is required'),

    state: yup.string()
        .required('State field is required'),

    zip: yup.string()
        .required('Zip code field is required'),

}).required();

export default function CreateBusiness() {

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
        const res = await Axios.post('/business/create', { ...value })

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

                <FormControl isInvalid={errors.name}>
                    <FormLabel>Business Name</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        _focus={{
                            ring: '1px',
                            ringColor: '#00B29E',
                            borderColor: '#00B29E'
                        }}
                        placeholder='Enter business name'
                        {...register('name')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.contact}>
                    <FormLabel>Contact No</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        _focus={{
                            ring: '1px',
                            ringColor: '#00B29E',
                            borderColor: '#00B29E'
                        }}
                        placeholder='Enter contact number'
                        {...register('contact')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.contact && errors.contact.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl isInvalid={errors.location}>
                    <FormLabel>Business Location</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        _focus={{
                            ring: '1px',
                            ringColor: '#00B29E',
                            borderColor: '#00B29E'
                        }}
                        placeholder='Enter business address location'
                        {...register('location')}

                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.location && errors.location.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl isInvalid={errors.city}>
                    <FormLabel>City</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        _focus={{
                            ring: '1px',
                            ringColor: '#00B29E',
                            borderColor: '#00B29E'
                        }}
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
                        _focus={{
                            ring: '1px',
                            ringColor: '#00B29E',
                            borderColor: '#00B29E'
                        }}
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
                        _focus={{
                            ring: '1px',
                            ringColor: '#00B29E',
                            borderColor: '#00B29E'
                        }}
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
