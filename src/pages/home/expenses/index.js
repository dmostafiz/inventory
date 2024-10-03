import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment/moment'
import Link from 'next/link'
import React, { useContext } from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateCategoryModal from '../../../Components/home/Dashboard/FormModals/CreateCategoryModal'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function index() {

  const { data, error, isLoading } = useQuery(['getExpenses'], async () => {
    const res = await Axios('/expense/get')
    return res?.data
  })

  const { deleteAction } = useAppActions()

  return (
    <Layout
      title='Expenses'
      breads={[
        { title: 'Expense', link: '/home/expenses' }
      ]}

      titleRight={<Link href='/home/expenses/add'><Button>Add expenses</Button></Link>}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Expense list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.expenses?.length > 0 && <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Expense Type</Th>
                    <Th>Expense Description</Th>
                    <Th>Amount</Th>
                    <Th>Expense Date</Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>

                  {data?.expenses?.map((expense, index) => {

                    return <Tr key={index}>
                      <Td>{expense.type}</Td>
                      <Td>{expense.note}</Td>
                      <Td>{expense.amount}</Td>
                      <Td>{moment(expense.expenseDate).format('LL')}</Td>
                      <Td isNumeric>
                        {/* <Button size={'sm'} colorScheme='teal'>Edit</Button>
                        <Button
                          onClick={() => deleteAction({
                            id: expense.id,
                            url: '/expense/delete',
                            refetchKies: ['getExpenses']
                          })}
                          size={'sm'}
                          colorScheme='red'
                          ml={2}>
                          Delete
                        </Button> */}
                      </Td>
                    </Tr>

                  })}

                </Tbody>
              </Table>}


              {!isLoading && !data?.expenses?.length && <DataNotFound />}


            </TableContainer>


          </CardBody>
        </Card>
      </Box>
    </Layout>
  )
}
