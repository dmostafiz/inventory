import { Box, Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Input, Select } from '@mantine/core'
import React, { useState } from 'react'
import currencies from '../../../../Helpers/currencies'
import Layout from '../../../../Layouts/Home/Layout'

export default function index() {

    const [symbol, setSymbol] = useState('')
    const [code, setCode] = useState('')
    const [position, setPosition] = useState('Left')


    const handleChange = (value) => {
        const currency = currencies.find(c => c.value == value)
        if(currency){
            setSymbol(currency.symbol)
            setCode(currency.value)
        }
        // console.log('Current:', currency)
    }

    return (
        <Layout
            title='General Settings'
            breads={[
                { title: 'Settings', link: '#' },
                { title: 'General', link: '/home/settings/general' },
            ]}
        >
            <Card flex='1' shadow={'md'} bg='white'>

                <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                    <Heading size='md'>General Settings</Heading>
                </CardHeader>

                <CardBody p={5}>

                    <Heading size='xs' mb={2}>
                        Business Currency
                    </Heading>


                    <SimpleGrid columns={4} gap={3}>
                        <Box mb={4}>
                            <Select
                                label="Select Currency"
                                placeholder="Select default currency"
                                searchable
                                nothingFound="No options"
                                data={currencies}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box mb={4}>
                            <Input.Wrapper label="Currency code">
                                <Input readOnly value={code} placeholder='Currency code will be selected automatically.' />
                            </Input.Wrapper>
                        </Box>

                        <Box mb={4}>
                            <Input.Wrapper label="Currency symbol">
                                <Input readOnly value={symbol} placeholder='Symbol will be selected automatically.' />
                            </Input.Wrapper>
                        </Box>

                        <Box mb={4}>
                            <Select
                                label="Symbol position"
                                placeholder="Select default currency"
                                searchable
                                nothingFound="No options"
                                data={['Right', 'Left']}
                                value={position}
                                onChange={setPosition}

                            />
                        </Box>
                    </SimpleGrid>


                </CardBody>
            </Card>

        </Layout>

    )
}
