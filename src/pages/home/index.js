import { Alert, AlertIcon, Box, Card, CardBody, CardHeader, Flex, Heading, SimpleGrid, Stack, StackDivider, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { AiFillCreditCard, AiFillMinusCircle } from 'react-icons/ai'
import { BsCreditCard2Front, BsFillBagCheckFill, BsFillInfoSquareFill, BsFillReplyAllFill } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import StatsCard from '../../Components/home/Dashboard/StatCard'
import Layout from '../../Layouts/Home/Layout'

import dynamic from "next/dynamic";
import useUser from '../../Hooks/useUser'
import Link from 'next/link'
import Axios from '../../Helpers/Axios'
import { useQuery } from '@tanstack/react-query'

const SalesChart = dynamic(import("../../Components/home/Dashboard/Charts/SalesChart"), {
  ssr: false
});

export default function index() {

  const { isError, error, authUser, isLoading, logoutUser } = useUser()

  const { data } = useQuery(['myBusinesses'], async () => {
    const res = await Axios.get('/business')

    // console.log('Business response', res)
    return res.data
})


  console.log('auth user', authUser)

  return (
    <Layout
      title={`Welcome ${authUser?.firstName}`}
      header={
        <>
          {data?.businesses?.length < 1 && <Box mt={5} mb={5}>
            <Alert status='info' variant='left-accent' shadow={'md'} bg='white'>
              <AlertIcon />
              <Box>We are very happy to get you here today. To run your operations, please setup your business infomation right now (
                <Link href='/home/settings/business'><Text as='span' color='#00B29E'>Click Here</Text></Link>)</Box>
            </Alert>
          </Box>}

          <Box mt={5}>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 2, lg: 5 }}>
              <StatsCard
                title={'TOTAL SALES'}
                stat={'5,000'}
                icon={<BsFillBagCheckFill size={'1.5em'} />}
              />
              <StatsCard
                title={'NET'}
                stat={'1,000'}
                icon={<FiServer size={'1.5em'} />}
                iconBg='green.400'
              />
              <StatsCard
                title={'INVOICE DUE'}
                stat={'705'}
                icon={<GoLocation size={'1.5em'} />}
                iconBg='orange.400'
              />
              <StatsCard
                title={'TOTAL SALES RETURNS'}
                stat={'7'}
                icon={<AiFillMinusCircle size={'1.5em'} />}
                iconBg='red.500'
              />
            </SimpleGrid>
          </Box>
          <Box mt={4}>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 2, lg: 5 }}>
              <StatsCard
                title={'TOTAL PURCHASES'}
                stat={'5,000'}
                icon={<AiFillCreditCard size={'1.5em'} />}
                iconBg='blue.400'
              />
              <StatsCard
                title={'PURCHASES DUE'}
                stat={'1,000'}
                icon={<BsFillInfoSquareFill size={'1.5em'} />}
                iconBg='orange.400'
              />
              <StatsCard
                title={'PURCHASES RETURNS'}
                stat={'545'}
                icon={<BsFillReplyAllFill size={'1.5em'} />}
                iconBg='red.400'
              />
              <StatsCard
                title={'EXPENSES'}
                stat={'0.0'}
                icon={<BsCreditCard2Front size={'1.5em'} />}
                iconBg='red.400'
              />
            </SimpleGrid>
          </Box>
        </>
      }
      gradient={true}
    >


      <Card shadow={'md'} bg='white' mt={4}>
        <CardHeader bg={'#1CE7CF'} py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
          <Heading size='md'>Sales last 30 days</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <SalesChart />
          </Stack>
        </CardBody>
      </Card>

      <Card shadow={'md'} bg='white' mt={4}>
        <CardHeader bg={'#1CE7CF'} py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
          <Heading size='md'>Sales Current Financial Year</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <SalesChart />
          </Stack>
        </CardBody>
      </Card>

      <Box mt={4}>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={4}>
          <Card flex='1' shadow={'md'} bg='white'>
            <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
              <Heading size='md'>Sales payment due</Heading>
            </CardHeader>
            <CardBody p={2} pt={0}>
              <TableContainer>
                <Table size='sm' variant='striped'>
                  <Thead>
                    <Tr>
                      <Th>Customer</Th>
                      <Th>Invoice No</Th>
                      <Th isNumeric>Due Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>inches</Td>
                      <Td>45rfd45rg45</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>sfgsr4rtgr45</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>rtyhbf45rgf45</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

            </CardBody>
          </Card>

          <Card flex='1' shadow={'md'} bg='white'>
            <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
              <Heading size='md'>Purchase payments due</Heading>
            </CardHeader>
            <CardBody p={2} pt={0}>
              <TableContainer>
                <Table size='sm' variant='striped'>
                  <Thead>
                    <Tr>
                      <Th>Supplier</Th>
                      <Th>Reference No</Th>
                      <Th isNumeric>Due Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>inches</Td>
                      <Td>sdf43445wfg34</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>45tfw45fwe556</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>64g45g5657et45</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>


            </CardBody>
          </Card>

        </Flex>
      </Box>

      <Box mt={4}>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Product stock alerts</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Product</Th>
                    <Th>Category</Th>
                    <Th isNumeric>Current stock</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Apple iPhone 8 - Internal Memory - 32 GB (AS0015-1)</Td>
                    <Td>Apple</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>Samsung Galaxy S8 - Internal Memory - 64 GB (AS0014-1)</Td>
                    <Td>Android</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>Acer Aspire E 15 - Color - White (AS0017-2)</Td>
                    <Td>Laptop</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                  <Tr>
                    <Td>Apple iPhone 8 - Internal Memory - 32 GB (AS0015-1)</Td>
                    <Td>Apple</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>Samsung Galaxy S8 - Internal Memory - 64 GB (AS0014-1)</Td>
                    <Td>Android</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>Acer Aspire E 15 - Color - White (AS0017-2)</Td>
                    <Td>Laptop</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                  <Tr>
                    <Td>Apple iPhone 8 - Internal Memory - 32 GB (AS0015-1)</Td>
                    <Td>Apple</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>Samsung Galaxy S8 - Internal Memory - 64 GB (AS0014-1)</Td>
                    <Td>Android</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>Acer Aspire E 15 - Color - White (AS0017-2)</Td>
                    <Td>Laptop</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                  <Tr>
                    <Td>Apple iPhone 8 - Internal Memory - 32 GB (AS0015-1)</Td>
                    <Td>Apple</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>Samsung Galaxy S8 - Internal Memory - 64 GB (AS0014-1)</Td>
                    <Td>Android</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>Acer Aspire E 15 - Color - White (AS0017-2)</Td>
                    <Td>Laptop</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>


          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
