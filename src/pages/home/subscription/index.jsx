import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { MdCheckCircle } from 'react-icons/md'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {
    return (
        <Layout
            onlyAdmin={true}
            title='Subscription'
            breads={[
                { title: 'Subscription', link: '/home/subscription' },
            ]}
        >
            {/* <Card flex='1' shadow={'md'} bg='white'>

                <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                    <Heading size='md'>Subscription</Heading>
                </CardHeader>

                <CardBody p={5}> */}
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                mb={5}
                bg='white'
                shadow={'sm'}
            >
                <CardBody>
                    <Text fontSize={'lg'}>You are currently browsing the free plan with basic features.</Text>
                </CardBody>
            </Card>


            <Card
                direction={{ base: 'column', sm: 'row' }}
                alignItems={['start', 'center']}
                overflow='hidden'
                variant='outline'
                bg='white'
                shadow={'sm'}

            >
                <Image
                    objectFit='contain'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-client-user-costs-employee-finance-money-person-blue-icon-png-image_1649029.jpg'
                    alt='Caffe Latte'
                />


                <CardBody>
                    <Heading size='md'>PREMIUM PLAN</Heading>

                    <Text mb={5} color='gray.500'>
                        Subscribe our premium plan to unlock extensive features.
                    </Text>

                    <List spacing={1}>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Realtime reports
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Inventory level and stock management
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Other premium features
                        </ListItem>
                    </List>
                </CardBody>

                <CardFooter>
                    <Box>
                        <Text mb={3}>
                            <Text as='span' fontWeight={'bold'} fontSize='xl'>$55</Text>
                            <Text as={'span'}> / </Text>
                            <Text as={'span'}>month</Text>
                        </Text>
                        <Button variant='solid' colorScheme='teal'>
                            Subscribe Now
                        </Button>
                    </Box>
                </CardFooter>

            </Card>

            {/* </CardBody>

            </Card > */}

        </Layout >
    )
}
