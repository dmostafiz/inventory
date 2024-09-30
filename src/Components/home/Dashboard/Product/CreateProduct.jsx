import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, SimpleGrid, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from '../../../../Helpers/Axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FileButton, Image, Title } from '@mantine/core';
import useProductUpload from '../../../../Hooks/useProductUpload';
import { BusinessContext } from '../../../../Contexts/BusinessContext';

const schema = yup.object({

    name: yup.string()
        .required('This field is required!'),

    sku: yup.string(),

    unitId: yup.string()
        .required('This field is required'),

    brandId: yup.string()
        .required('This field is required'),

    categoryId: yup.string()
        .required('This field is required'),

    rackNo: yup.string(),

    row: yup.string(),

    column: yup.string(),

    alertQuantity: yup.number()
        .required('This field is required'),

    unitValue: yup.number()
        .required('This field is required'),


    description: yup.string(),

}).required();

export default function CreateProduct({product = null}) {

    const {businessNotFound, hasBusiness, business} = useContext(BusinessContext)

    console.log('business info', business())

    const queryClient = useQueryClient()

    const toast = useToast()


    const [tax, setTax] = useState(null);
    const [taxRate, setTaxRate] = useState(0);
    const [profitMargin, setProfitMargin] = useState(25);
    const [purchasePrice, setPurchasePrice] = useState(0);

    const [sellingPriceExcludingTax, setSellingPriceExcludingTax] = useState(0);
    const [sellingPriceIncludingTax, setSellingPriceIncludingTax] = useState(0);

    useEffect(() => {

        const taxObj = taxes?.data?.find(t => t.id == tax)
        setTaxRate(taxObj?.rate ?? 0)
        // const puchasingPriceIncTax = taxObj ? +((+purchasePrice * +taxObj?.rate) / 100) + +purchasePrice : +purchasePrice

        const sellingPriceExcTax = ((+purchasePrice * +profitMargin) / 100) + +purchasePrice
        setSellingPriceExcludingTax(sellingPriceExcTax)

        const sellingPriceIncTax = taxObj ? ((sellingPriceExcTax * +taxObj?.rate) / 100) + sellingPriceExcTax : sellingPriceExcTax
        setSellingPriceIncludingTax(sellingPriceIncTax)

        console.log('Purchase price including tax', sellingPriceIncTax)

    }, [profitMargin, purchasePrice, tax])

    const { setFile, preview, setPreview, image } = useProductUpload()

    const units = useQuery(['getUnitsq1'], async () => {
        const res = await Axios.get('/unit/get')
        return res?.data?.units
    })

    const categories = useQuery(['getCategories1'], async () => {
        const res = await Axios.get('/category/get')
        return res?.data?.categories
    })

    const brands = useQuery(['getBrands1'], async () => {
        const res = await Axios.get('/brand/get')
        return res?.data?.brands
    })

    const variants = useQuery(['getVariants1'], async () => {
        const res = await Axios.get('/variant/get')
        return res?.data?.variants
    })

    const taxes = useQuery(['getTaxes1'], async () => {
        const res = await Axios.get('/tax/get')
        return res?.data?.taxes
    })

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            alertQuantity: 10,
            unitValue: 1
        }
    })

    const submitNow = async (value) => {
        const productData = { ...value, image, taxId: tax, taxRate, profitMargin, purchasePrice, sellingPriceExcludingTax, sellingPriceIncludingTax, business: business()?.id }

        console.log('productData ', productData)
        
        const res = await Axios.post('/product/create', productData)

        console.log('Post create response: ', res)

        if (res?.data?.ok) {

            await queryClient.refetchQueries({ queryKey: ['myProducts'] })

            toast({
                title: 'Congratulations!',
                description: 'You have just created a new product.',
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            reset({
                name: '',
                sku: '',
                unitId: '',
                brandId: '',
                categoryId: '',
                description: '',
                alertQuantity: 10,
                unitValue: 1
            })

            setPreview(null)
            setFile(null)
            setTax(null)
            setTaxRate(0)
            setProfitMargin(25)
            setPurchasePrice(0)

        } else {
            toast({
                title: 'Ooppss!',
                description: res?.data?.msg,
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


                <FormControl isRequired isInvalid={errors.categoryId}>
                    <FormLabel>Category</FormLabel>
                    <Select
                        size={'sm'}
                        placeholder='Select Category'
                        focusBorderColor='#00B29E'
                        {...register('categoryId')}
                    >
                        {categories?.data?.map((cat, i) => <option key={i} value={cat.id}>{cat.name}</option>)}
                    </Select>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.categoryId && errors.categoryId.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={errors.brandId}>
                    <FormLabel>Brand</FormLabel>
                    <Select
                        size={'sm'}
                        placeholder='Select brand'
                        focusBorderColor='#00B29E'
                        {...register('brandId')}
                    >
                        {brands?.data?.map((brand, i) => <option key={i} value={brand.id}>{brand.name}</option>)}
                    </Select>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.brandId && errors.brandId.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={errors.unitId}>
                    <FormLabel>Unit</FormLabel>
                    <Select
                        size={'sm'}
                        placeholder='Select unit'
                        focusBorderColor='#00B29E'
                        {...register('unitId')}
                    >
                        {units?.data?.map((unit, i) => <option key={i} value={unit.id}>{unit.name}</option>)}
                    </Select>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.unitId && errors.unitId.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={errors.unitValue}>
                    <FormLabel>Unit value (number)</FormLabel>
                    <Input
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Enter unit value'
                        defaultValue={0}
                        min={0}
                        {...register('unitValue')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.unitValue && errors.unitValue.message}
                    </FormErrorMessage>
                </FormControl>

            </SimpleGrid>

            <Flex direction={{ base: 'column', lg: 'row' }} mt={8} gap={10}>
                <FormControl isInvalid={errors.description}>
                    <FormLabel>Description (Optional)</FormLabel>
                    <Textarea
                        rows={8}
                        maxW={{ base: '100%', lg: '100%' }}
                        focusBorderColor='#00B29E'
                        placeholder='Enter product description'
                        min={0}
                        {...register('description')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.description && errors.description.message}
                    </FormErrorMessage>
                </FormControl>

                <Box width={{ base: 'full', md: '50%' }} mb={10}>

                    <FormControl isRequired>
                        <FormLabel>Product Image</FormLabel>
                        <FileButton onChange={setFile} accept="image/png,image/jpeg">
                            {(props) => <Center bg={preview ? 'gray.800' : 'gray.50'} bgImage={preview} bgSize='contain' bgPosition={'center'} bgRepeat='no-repeat' border={'2px'} borderColor='blackAlpha.100' cursor={'pointer'} {...props} w='full' h={preview ? { base: 200, md: 200 } : 200}>
                                <Button size='sm' bg={'#1CE7CF'} variant='outline'>{preview ? 'Change product image' : 'Upload product image'}</Button>
                            </Center>}
                        </FileButton>
                    </FormControl>

                </Box>

            </Flex>

            <hr />
            <SimpleGrid py={8} columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacingX={8} spacingY={4}>
                <FormControl isInvalid={errors.rackNo}>
                    <FormLabel>Rack No</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter rack id number'
                        {...register('rackNo')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.rackNo && errors.rackNo.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.row}>
                    <FormLabel>Rack Row</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter rack row number'
                        {...register('row')}
                    />
                    <FormErrorMessage>
                        {errors.row && errors.row.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.column}>
                    <FormLabel>Rack Column</FormLabel>
                    <Input
                        size={'sm'}
                        type='text'
                        focusBorderColor='#00B29E'
                        placeholder='Enter rack column number'
                        {...register('column')}
                    />
                    <FormErrorMessage>
                        {errors.column && errors.column.message}
                    </FormErrorMessage>
                </FormControl>

            </SimpleGrid>
            <hr />


            <SimpleGrid mt={8} columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacingX={8} spacingY={4}>


                <FormControl isRequired isInvalid={errors.alertQuantity}>
                    <FormLabel>Alert Quantity</FormLabel>
                    <Input
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Enter alert quantity'
                        defaultValue={0}
                        min={0}
                        {...register('alertQuantity')}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.alertQuantity && errors.alertQuantity.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl>
                    <FormLabel>Applicable Tax</FormLabel>
                    <Select
                        size={'sm'}
                        placeholder='Select applicable tax'
                        focusBorderColor='#00B29E'
                        onChange={e => setTax(e.target.value)}
                        value={tax?.id}
                    >
                        {taxes?.data?.map((tx, i) => <option key={i} value={tx.id}>{tx.name}</option>)}
                    </Select>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    <FormErrorMessage>
                        {errors.taxId && errors.taxId.message}
                    </FormErrorMessage>
                </FormControl>


                <FormControl isRequired>
                    <FormLabel>Estimated profit margin (%)</FormLabel>
                    <Input
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Enter estimated profit margin'
                        defaultValue={25}
                        // {...register('margin')}
                        min={0}
                        onChange={e => setProfitMargin(e.target.value)}
                        value={profitMargin}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    {/* <FormErrorMessage>
                        {errors.margin && errors.margin.message}
                    </FormErrorMessage> */}
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Default Purchasing Price</FormLabel>
                    <Input
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Enter estimated profit defaultPurchasePrice'
                        min={.1}
                        // {...register('defaultPurchasePrice')}
                        onChange={e => setPurchasePrice(e.target.value)}
                        value={purchasePrice}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    {/* <FormErrorMessage>
                        {errors.defaultPurchasePrice && errors.defaultPurchasePrice.message}
                    </FormErrorMessage> */}
                </FormControl>


                <FormControl>
                    <FormLabel>Selling Price (Exc Tax)</FormLabel>
                    <Input
                        readOnly
                        // disabled
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Selling price excluding tax'
                        min={.1}
                        onChange={e => setSellingPriceExcludingTax(e.target.value)}
                        value={sellingPriceExcludingTax}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    {/* <FormErrorMessage>
                        {errors.defaultPurchasePrice && errors.defaultPurchasePrice.message}
                    </FormErrorMessage> */}
                </FormControl>


                <FormControl>
                    <FormLabel>Selling Price (Inc Tax)</FormLabel>
                    <Input
                        readOnly
                        // disabled
                        size={'sm'}
                        type='number'
                        focusBorderColor='#00B29E'
                        placeholder='Selling price including tax'
                        min={.1}
                        onChange={e => setSellingPriceIncludingTax(e.target.value)}
                        value={sellingPriceIncludingTax}
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                    {/* <FormErrorMessage>
                        {errors.defaultPurchasePrice && errors.defaultPurchasePrice.message}
                    </FormErrorMessage> */}
                </FormControl>

            </SimpleGrid>


            <Box pt={8}>
                <Button
                    colorScheme={'teal'}
                    isLoading={isSubmitting}
                    loadingText={'Creating....'}
                    onClick={hasBusiness ? handleSubmit(submitNow) : businessNotFound}
                >
                    Create Product
                </Button>
            </Box>
        </Box>
    )
}
