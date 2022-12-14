import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { FiMenu, FiSearch, FiServer } from "react-icons/fi";
import React from "react";
import LeftSidebar from "../../Components/home/LeftSidebar";
import TopBar from "../../Components/home/TopBar";
import Statistics from "../../Components/home/Dashboard/StatCard";
import StatsCard from "../../Components/home/Dashboard/StatCard";
import { BsArrowCounterclockwise, BsCart, BsFillBagCheckFill, BsFillInfoCircleFill, BsFillInfoSquareFill, BsFillReplyAllFill, BsPerson } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { AiFillCreditCard, AiFillMinusCircle } from "react-icons/ai";
// import { Logo } from "@choc-ui/logo";

export default function App() {

  const sidebar = useDisclosure();

  return (

    <Box as="section" bg="gray.50" minH="100vh">

      <LeftSidebar display={{ base: "none", md: "unset" }} />

      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <LeftSidebar w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>


      <Box ml={{ base: 0, md: 60 }}>

        <TopBar sidebar={sidebar} />

        <Box as="main">

          <Box px={{base:2, md:5}} pt={5} pb={5} w='full' bgGradient='linear(to-b, #dce0cd, #40e0d000)' roundedBottom={'30px'}>

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
                  icon={<GoLocation size={'1.5em'} />}
                  iconBg='red.400'
                />
              </SimpleGrid>
            </Box>
          </Box>




          <Box px={{base:2, md:5}}>


            <Card shadow={'md'}>
              <CardHeader>
                <Heading size='md'>Sales last 30 days</Heading>
              </CardHeader>

              <CardBody>

                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Summary
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Overview
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      Check out the overview of your clients.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Analysis
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      See a detailed analysis of all your business clients.
                    </Text>
                  </Box>
                </Stack>

              </CardBody>

            </Card>

          </Box>

        </Box>
      </Box>
    </Box>
  );
};
