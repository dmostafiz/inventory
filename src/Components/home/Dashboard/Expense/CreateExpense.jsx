import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'

import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios'
import { DatePicker } from '@mantine/dates';
import toasterHook from '../../../../Hooks/toasterHook';
import { useRouter } from 'next/router';
import { BusinessContext } from '../../../../Contexts/BusinessContext';

const schema = yup.object({

    type: yup.string()
        .required('Name field is required!'),

    note: yup.string()
        .required('This field is required!'),

    amount: yup.number()
        .required('This field is required!'),

}).required();

export default function CreateExpense() {

    const {businessNotFound, hasBusiness} = useContext(BusinessContext)


    const [expenseDate, setExpenseDateDate] = useState(null)
    const toast = toasterHook()
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            amount: 0,
        }
    })


    const submitData = async (value) => {

        const res = await Axios.post('/expense/create', { ...value, expenseDate })

        if (res?.data?.ok == true) {

            toast({
                title: 'Awesome!',
                description: 'Expense added successfully.',
                status: 'success'
            })

            router.push('/home/expenses')
        }

    }

    return (
        <Box>

            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacingX={8} spacingY={4}>

                <FormControl isRequired isInvalid={errors.type}>
                    <FormLabel>Expense Type</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter expense type'
                        {...register('type')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.type && errors.type.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl isRequired isInvalid={errors.note}>
                    <FormLabel>Expense Note</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter expense note'
                        {...register('note')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.note && errors.note.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Expense Date</FormLabel>
                    <DatePicker onChange={value => setExpenseDateDate(value)} placeholder="Pick date" />
                    {/* <FormErrorMessage>
                        {errors.sku && errors.sku.message}
                    </FormErrorMessage> */}
                </FormControl>


                <FormControl isRequired isInvalid={errors.amount}>
                    <FormLabel>Expense Amount</FormLabel>
                    <Input
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Enter expense amount'
                        {...register('amount')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.amount && errors.amount.message}
                    </FormErrorMessage>
                </FormControl>

            </SimpleGrid>

            <Box pt={5}>
                <Button
                    colorScheme='teal'
                    onClick={hasBusiness() ? handleSubmit(submitData) : businessNotFound}
                    isLoading={isSubmitting}
                    loadingText='Creating...'
                >
                    Add Expense
                </Button>
            </Box>

        </Box>
    )
}
