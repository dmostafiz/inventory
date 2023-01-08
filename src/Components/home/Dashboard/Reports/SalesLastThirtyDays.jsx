import { Card, CardBody, CardHeader, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import AreaChart from '../../../Charts/AreaChart'
import BarChart from '../../../Charts/BarChart'
import LineChart from '../../../Charts/LineChart'

export default function SalesLastThirtyDays() {
    return (
        <Card shadow={'md'} bg='white' mt={4}>
            <CardHeader bg={'#1CE7CF'} py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                <Heading size='md'>Sales last 30 days</Heading>
            </CardHeader>
            <CardBody p={0}>
                <BarChart title='Sales' />
            </CardBody>
        </Card>

    )
}
