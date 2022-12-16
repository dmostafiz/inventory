import { Box, Button, Card, CardBody, CardHeader, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../../Layouts/Home/Layout'

export default function supliers() {
  return (
    <Layout
      title='Supliers'
      titleRight={<Button bg='turquoise'>Add Supplier</Button>}
      breads={[
        { title: 'Contacts', link:'#'},
        { title: 'Supliers', link:'/home/contacts/supliers'}
      ]}
    >


      <Box>
        <Card flex='1' shadow={'md'} bg='white'>
          <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
            <Heading size='md'>Supliers list</Heading>
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
