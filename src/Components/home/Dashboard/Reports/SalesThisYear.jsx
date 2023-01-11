import { Card, CardBody, CardHeader, Heading, Stack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Axios from '../../../../Helpers/Axios'
import AreaChart from '../../../Charts/AreaChart'
import LineChart from '../../../Charts/LineChart'
import ComponentLoader from '../../../ComponentLoader'
import DataNotFound from '../../../DataNotFound'

export default function SalesThisYear() {

    const {data, isLoading} = useQuery(['getSalesThisYear'], async () => {
        const res = await Axios.get('/report/sales_this_year')
        console.log('sales_this_year', res.data?.sales)
        return res.data
    })

    return (
        <Card shadow={'md'} bg='white' mt={4}>
            <CardHeader bg={'#1CE7CF'} py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                <Heading size='md'>Sales Current Financial Year</Heading>
            </CardHeader>
 
            <CardBody p={0}>
               {(isLoading && !data?.keys?.length) && <ComponentLoader />}
               {(!isLoading && data?.keys?.length) &&  <AreaChart keys={data.keys} values={data.values} title='Sales' />}
               {!isLoading && !data?.keys?.length && <DataNotFound />}
            </CardBody>
        </Card>

    )
}
