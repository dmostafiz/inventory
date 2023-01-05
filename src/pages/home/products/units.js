import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateUnitModal from '../../../Components/home/Dashboard/FormModals/CreateUnitModal'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function units() {

  const { data, error, isLoading } = useQuery(['getUnits'], async () => {
    const res = await Axios('/unit/get')
    console.log('Load units', res)
    return res?.data
  })

  const { deleteAction } = useAppActions()

  return (
    <Layout
      title='Units'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Units', link: '/home/products/units' }
      ]}
      titleRight={<CreateUnitModal />}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Unit list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader size='md' />}

              {!isLoading && data?.units?.length > 0 && <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Unit</Th>
                    <Th>Short Name</Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.units?.map((unit, index) => {
                    return <Tr key={index}>
                      <Td>{unit.name}</Td>
                      <Td>{unit.shortName}</Td>
                      <Td isNumeric>
                        <Button size={'sm'} colorScheme='teal'>Edit</Button>
                        <Button
                          onClick={() => deleteAction({
                            id: unit.id,
                            url: '/unit/delete',
                            refetchKies: ['getUnits']
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

              {!isLoading && !data?.units?.length && <DataNotFound />}

            </TableContainer>


          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
