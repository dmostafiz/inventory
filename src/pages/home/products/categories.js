import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import ComponentLoader from '../../../Components/ComponentLoader'
import DataNotFound from '../../../Components/DataNotFound'
import CreateCategoryModal from '../../../Components/home/Dashboard/FormModals/CreateCategoryModal'
import Axios from '../../../Helpers/Axios'
import useAppActions from '../../../Hooks/useAppActions'
import Layout from '../../../Layouts/Home/Layout'

export default function categories() {

  const { data, error, isLoading } = useQuery(['getCategories'], async () => {
    const res = await Axios('/category/get')
    return res?.data
  })

  const { deleteAction } = useAppActions()

  return (
    <Layout
      title='Categories'
      breads={[
        { title: 'Products', link: '/home/products' },
        { title: 'Categories', link: '/home/products/categories' }
      ]}

      titleRight={<CreateCategoryModal />}
    >
      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader bg='#1CE7CF' py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Category list</Heading>
          </CardHeader>
          <CardBody p={2} pt={0}>
            <TableContainer>
              {isLoading && <ComponentLoader />}

              {!isLoading && data?.categories?.length > 0 && <Table size='sm' variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Category Name</Th>
                    <Th>Description</Th>
                    <Th>Products Count</Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>

                  {data?.categories?.map((cat, index) => {
                    if (!cat.isSubcategory) {
                      return <Tr key={index}>
                        <Td>{cat.name}</Td>
                        <Td>{cat.description}</Td>
                        <Td>0 products</Td>
                        <Td isNumeric>
                          <Button size={'sm'} colorScheme='teal'>Edit</Button>
                          <Button
                            onClick={() => deleteAction({
                              id: cat.id,
                              url: '/category/delete',
                              refetchKies: ['getCategories']
                            })}
                            size={'sm'}
                            colorScheme='red'
                            ml={2}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    }
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
