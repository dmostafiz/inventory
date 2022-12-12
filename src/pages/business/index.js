import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import React from "react";
import NavItem from "../../Components/Sidebar/NavItem";
import Submenu from "../../Components/Sidebar/Submenu";
import Link from "next/link";
import Logo from "../../Components/Logo";
// import { Logo } from "@choc-ui/logo";

export default function App() {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const ok = useDisclosure();

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      // bg="turquoise"
      bgGradient='linear(to-tr, turquoise, #2da89c)'
      border
      color="inherit"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Link href='/'>
          <Logo />
        </Link>
      </Flex>

      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome}>Home</NavItem>
        {/* <NavItem icon={FaRss}>Articles</NavItem> */}
        {/* <NavItem icon={HiCollection}>Collections</NavItem> */}
        {/* <NavItem icon={FaClipboardCheck}>Checklists</NavItem> */}

        <Submenu
          icon={HiCode}
          title={'Submenu'}
        >
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>

          <Submenu
            // icon={HiCode}
            title={'Integrations'}
            pl="12" py="2"
          >
            <NavItem pl="16" py="2">
              Shopify
            </NavItem>
            <NavItem pl="16" py="2">
              Slack
            </NavItem>
            <NavItem pl="16" py="2">
              Zapier
            </NavItem>
          </Submenu>
        </Submenu>

        <NavItem icon={AiFillGift}>Products</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );

  return (

    <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">

      <SidebarContent display={{ base: "none", md: "unset" }} />

      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>


      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          borderBottomWidth="1px"
          borderColor='gray.200'
          color="inherit"
          h="14"
          shadow={'sm'}
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input
              _focus={{
                ring: '0',
                borderColor: 'gray.200'
              }}
              borderColor='gray.200'
              placeholder="Search for products..."
            />
          </InputGroup>

          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">






        </Box>
      </Box>
    </Box>
  );
};
