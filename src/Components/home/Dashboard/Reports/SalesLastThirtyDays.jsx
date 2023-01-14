import { Card, CardBody, CardHeader, Heading, Stack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Axios from '../../../../Helpers/Axios'
import AreaChart from '../../../Charts/AreaChart'
import BarChart from '../../../Charts/BarChart'
import LineChart from '../../../Charts/LineChart'
import ComponentLoader from '../../../ComponentLoader'
import DataNotFound from '../../../DataNotFound'

export default function SalesLastThirtyDays() {

    const {data, isLoading} = useQuery(['getThirtyDaysSales'], async () => {
        const res = await Axios.get('/report/sales_thirty_days')
        console.log('sales_thirty_days', res.data?.sales)
        return res.data
    })

    return (
        <Card shadow={'md'} bg='white' mt={4}>
            <CardHeader bg={'#1CE7CF'} py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                <Heading size='md'>Sales last 30 days</Heading>
            </CardHeader>
            <CardBody p={0}>
               {(isLoading && !data?.keys?.length > 0) && <ComponentLoader />}
               {(!isLoading && data?.keys?.length > 0) &&  <BarChart keys={data.keys} values={data.values} title='Sales' />}
               {(!isLoading && !data?.keys?.length > 0) && <DataNotFound />}
            </CardBody>
        </Card>

    )
}
