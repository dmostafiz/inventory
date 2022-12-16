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
import Link from "next/link";
import React from "react";
import Breadcrumps from "../../Components/Breadcrumps";
import LeftSidebar from "../../Components/home/LeftSidebar";
import TopBar from "../../Components/home/TopBar";

// import { Logo } from "@choc-ui/logo";

export default function Layout({ title, breads = [], titleRight, header, gradient = false, children }) {

  const layoutWidth = { base: 2, md: 10 }

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

        <TopBar layoutWidth={layoutWidth} sidebar={sidebar} />

        <Box as="main">

          <Box px={layoutWidth} pt={8} pb={header ? 8 : 4} w='full' bgGradient={(header && gradient) && 'linear(to-b, #78DCCE, #40e0d000)'} roundedBottom={'30px'}>
            <Flex alignContent={'flex-end'} justify='space-between'>
              <Box>
                <Heading fontSize={'28px'} color='blackAlpha.800' mb='1'>
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
  );
};
