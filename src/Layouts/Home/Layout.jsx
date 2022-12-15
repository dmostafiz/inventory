import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import LeftSidebar from "../../Components/home/LeftSidebar";
import TopBar from "../../Components/home/TopBar";

// import { Logo } from "@choc-ui/logo";

export default function Layout({ title, children }) {

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

          <Box minH={'calc(100vh - 100px)'} px={layoutWidth} pt={8} pb={5} w='full' bgGradient={children && 'linear(to-b, #dce0cd, #40e0d000)'} roundedBottom={'30px'}>

            <Heading fontSize={'24px'} color='blackAlpha.800' mb={5}>
              {title}
            </Heading>

            <Box>
              {children}
            </Box>

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
