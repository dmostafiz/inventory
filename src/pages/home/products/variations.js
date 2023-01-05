import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateVariationModal from '../../../Components/home/Dashboard/FormModals/CreateVariationModal'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function variations() {

  const { data, error, isLoading } = useQuery(['getVariation'], async () => {
    const res = await Axios('/variation/get')
    console.log('Load variations', res)
    return res?.data
  })

  const { deleteAction } = useAppActions()


  return (
    <Layout
      title='Variations'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Variations', link: '/home/products/variations' }
      ]}
      titleRight={<CreateVariationModal />}
    >

      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Variation list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.variations?.length > 0 && <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Variation Name</Th>
                    <Th>Values</Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.variations?.map((variation, index) => {
                    return <Tr key={index}>
                      <Td>{variation.name}</Td>
                      <Td>{variation.values.map((value, i) => <Text key={i} as='span'>{value}{i + 1 < variation.values.length && ', '} </Text>)}</Td>
                      <Td isNumeric>
                        <Button size={'sm'} colorScheme='teal'>Edit</Button>
                        <Button
                          onClick={() => deleteAction({
                            id: variation.id,
                            url: '/variation/delete',
                            refetchKies: ['getVariation']
                          })}
                          size={'sm'}
                          colorScheme='red'
                          ml={2}>
                          Delete
                        </Button>
                      </Td>
                    </Tr>

                  })}

                </Tbody>
              </Table>}

              {!isLoading && !data?.variations?.length && <DataNotFound />}

            </TableContainer>


          </CardBody>
        </Card>
      </Box>

    </Layout>
  )
}
