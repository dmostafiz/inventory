import { Alert, AlertIcon, Box, Card, CardBody, CardHeader, Flex, Heading, SimpleGrid, Stack, StackDivider, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillCreditCard, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
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
import { DateRangePicker } from '@mantine/dates'
import DateRangeHook from '../../Hooks/DateRangeHook'
import SalesLastThirtyDays from '../../Components/home/Dashboard/Reports/SalesLastThirtyDays'
import SalesThisYear from '../../Components/home/Dashboard/Reports/SalesThisYear'
import SalesDue from '../../Components/home/Dashboard/Reports/SalesDue'
import PurchaseDue from '../../Components/home/Dashboard/Reports/PurchaseDue'
import StockAlerts from '../../Components/home/Dashboard/Reports/StockAlerts'

const SalesChart = dynamic(import("../../Components/Charts/LineChart"), {
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


  const { date, handleDateChange } = DateRangeHook()


  const headingReport = useQuery(['headingReports', date], async () => {
    const res = await Axios.get('/report/heading', {
      params: { date }
    })

    console.log('Heading report response', res.data)
    return res.data
  })


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
                title={'TOTAL PURCHASES'}
                stat={headingReport?.data?.purchase?.totalSales?.toFixed(2) || '0.00'}
                loading={headingReport?.isLoading}
                icon={<AiFillCreditCard size={'1.5em'} />}
                iconBg='blue.400'
                link={{
                  title: 'View all purchases',
                  url: '/home/purchases'
                }}
              />
              <StatsCard
                title={'PURCHASES PAID'}
                stat={headingReport?.data?.purchase?.totalPaid?.toFixed(2) || '0.00'}
                loading={headingReport?.isLoading}
                icon={<BsFillInfoSquareFill size={'1.5em'} />}
                iconBg='orange.400'
                link={{
                  title: 'View paid purchases',
                  url: '/home/purchases?status=paid'
                }}
              />
              <StatsCard
                title={'PURCHASES DUE'}
                stat={headingReport?.data?.purchase?.totalDue?.toFixed(2) || '0.00'}
                loading={headingReport?.isLoading}
                icon={<BsFillReplyAllFill size={'1.5em'} />}
                iconBg='red.400'
                link={{
                  title: 'View due purchases',
                  url: '/home/purchases?status=due'
                }}
              />
              <StatsCard
                title={'PURCHASED ITEMS'}
                stat={headingReport?.data?.purchase?.purchaseCount || '0'}
                loading={headingReport?.isLoading}
                icon={<AiFillPlusCircle size={'1.5em'} />}
                iconBg='red.400'
              />

              <StatsCard
                title={'TOTAL SALES'}
                stat={headingReport?.data?.sale?.totalSales?.toFixed(2) || '0.00'}
                loading={headingReport?.isLoading}
                icon={<BsFillBagCheckFill size={'1.5em'} />}
                link={{
                  title: 'View all sales',
                  url: '/home/sales'
                }}
              />
              <StatsCard
                title={'TOTAL PAID'}
                stat={headingReport?.data?.sale?.totalPaid?.toFixed(2) || '0.00'}
                loading={headingReport?.isLoading}
                icon={<FiServer size={'1.5em'} />}
                iconBg='green.400'
                link={{
                  title: 'View paid sales',
                  url: '/home/sales?status=paid'
                }}
              />
              <StatsCard
                title={'INVOICE DUE'}
                stat={headingReport?.data?.sale?.totalDue?.toFixed(2) || '0.00'}
                loading={headingReport?.isLoading}
                icon={<GoLocation size={'1.5em'} />}
                iconBg='orange.400'
                link={{
                  title: 'View due sales',
                  url: '/home/sales?status=due'
                }}
              />
              <StatsCard
                title={'TOTAL ITEMS SOLD'}
                stat={headingReport?.data?.sale?.salesCount || '0'}
                loading={headingReport?.isLoading}
                icon={<AiFillMinusCircle size={'1.5em'} />}
                iconBg='red.500'
              />

            </SimpleGrid>
          </Box>
        </>
      }
      gradient={true}
      titleRight={<DateRangePicker
        // label="Book hotel"
        placeholder="Pick dates range"
        value={date}
        onChange={handleDateChange}
      />}
    >


      <SalesLastThirtyDays />

      <SalesThisYear />

      <Box mt={4}>
        <SalesDue />
      </Box>

      <Box mt={4}>
        <PurchaseDue />
      </Box>

      <Box mt={4}>
        <StockAlerts />
      </Box>

    </Layout>
  )
}
