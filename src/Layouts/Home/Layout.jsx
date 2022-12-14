import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
  } from "@chakra-ui/react";
  import React from "react";
  import LeftSidebar from "../../Components/home/LeftSidebar";
  import TopBar from "../../Components/home/TopBar";

  // import { Logo } from "@choc-ui/logo";
  
  export default function Layout({children}) {
  
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
  
            <Box px={{base:2, md:5}} pt={5} pb={5} w='full' bgGradient={children && 'linear(to-b, #dce0cd, #40e0d000)'} roundedBottom={'30px'}>
  
                {children}
  
            </Box>
  
          </Box>
        </Box>
      </Box>
    );
  };
  