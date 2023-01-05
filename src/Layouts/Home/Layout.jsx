import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Breadcrumps from "../../Components/Breadcrumps";
import LeftSidebar from "../../Components/home/LeftSidebar";
import TopBar from "../../Components/home/TopBar";
import HomeWrapper from "../../wrappers/HomeWrapper";

// import { Logo } from "@choc-ui/logo";

export default function Layout({ title, breads = [], titleRight, header, gradient = false, showSidebar = true, children }) {

  const layoutWidth = { base: 2, md: 10 }

  const sidebar = useDisclosure();

  return (
    <HomeWrapper>

      <Head>
        <title>Tech Oak | {title}</title>
      </Head>

      <Box as="section" bg="gray.50" minH="100vh">

       {showSidebar && <LeftSidebar display={{ base: "none", md: "unset" }} />} 

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


        <Box ml={{ base: 0, md: showSidebar ? 60 : 0 }}>

          <TopBar layoutWidth={layoutWidth} sidebar={sidebar}  showSidebar={showSidebar}/>

          <Box as="main" bg={header ? 'white' : 'gray.50'}>

            <Box px={layoutWidth} pt={header ? 4 : 2} pb={header ? 8 : 2} mb={5} w='full' shadow={header? 'none' : 'sm'} bgGradient={(header && gradient) ? 'linear(to-b, #78DCCE, #40e0d000)' : 'linear(to-b, white, white)'} roundedBottom={header? '30px' : '0px'}>
              <Flex alignItems={'center'} justify='space-between'>
                <Box>
                  <Heading fontSize={'24px'} color='blackAlpha.800' mb='0'>
                    {title}
                  </Heading>
                  {breads.length > 0 && <Breadcrumps breads={breads} />}
                </Box>

                {titleRight && titleRight}
              </Flex>
              {header}
            </Box>


            <Box minH={'74vh'} px={layoutWidth} pb={16}>
              {children}
            </Box>


            <Box color={'gray.600'} bg='blackAlpha.50' px={layoutWidth} py={3}>
              <Flex w='full' alignItems={'center'} justify='space-between'>
                <Text fontSize='14px'>2022 @ tech-oak.com all rights reserved</Text>
                <Text fontSize={'12px'}>Developed by <a href="http://mostafiz.dev">Mostafiz Rahaman</a></Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};
