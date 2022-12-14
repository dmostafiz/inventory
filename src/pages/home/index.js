import { Box, Card, CardBody, CardHeader, Heading, SimpleGrid, Stack, StackDivider } from '@chakra-ui/react'
import React from 'react'
import { AiFillCreditCard, AiFillMinusCircle } from 'react-icons/ai'
import { BsCreditCard2Front, BsFillBagCheckFill, BsFillInfoSquareFill, BsFillReplyAllFill } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import StatsCard from '../../Components/home/Dashboard/StatCard'
import Layout from '../../Layouts/Home/Layout'

import dynamic from "next/dynamic";
  
const SalesChart  =  dynamic(import("../../Components/home/Dashboard/Charts/SalesChart"), {
  ssr: false
});

export default function index() {
  return (
    <Layout>

      <Heading as='h2' fontSize={'24px'} color='blackAlpha.700'>
        Welcome Mostafiz
      </Heading>

      <Box mt={3}>
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

      <Card shadow={'md'} bg='white' mt={4}>
        <CardHeader>
          <Heading size='md'>Sales last 30 days</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <SalesChart />
          </Stack>
        </CardBody>
      </Card>

      <Card shadow={'md'} bg='white' mt={4}>
        <CardHeader>
          <Heading size='md'>Sales Current Financial Year</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <SalesChart />
          </Stack>
        </CardBody>
      </Card>
    </Layout>
  )
}
