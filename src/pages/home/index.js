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
import { FaBell, FaClipboardCheck, FaMinusCircle, FaRss } from "react-icons/fa";
import { AiFillGift, AiFillMinusCircle } from "react-icons/ai";
import { BsCardHeading, BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsGearFill } from "react-icons/bs";
import { FiArrowDownCircle, FiArrowUpCircle, FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdArrowCircleUp, MdContacts, MdHome, MdKeyboardArrowRight } from "react-icons/md";
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
      bgGradient='linear(to-tr, turquoise, #40e0d036)'
      border
      color="inherit"
      w="60"
      shadow={'lg'}
      borderRight='2px'
      borderColor={'blackAlpha.200'}
      {...props}
    >
      <Box
        // bg='turquoise'
        h='14'
      >
        <Link href='/home'>
          <Logo />
        </Link>
      </Box>
      {/* <Flex px="4" py="5" align="center">
    
      </Flex> */}

      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <Link href='/home'>
          <NavItem icon={MdHome}>Home</NavItem>
        </Link>
        {/* <NavItem icon={FaRss}>Articles</NavItem> */}
        {/* <NavItem icon={HiCollection}>Collections</NavItem> */}
        {/* <NavItem icon={FaClipboardCheck}>Checklists</NavItem> */}

        <Submenu
          icon={MdContacts}
          title={'Contacts'}
        >
          <NavItem pl="6" py="1" submenu={true}>
            Supliers
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Customers
          </NavItem>
        </Submenu>

        <Submenu
          icon={AiFillGift}
          title={'Products'}
        >
          <NavItem pl="6" py="1" submenu={true}>
            Product List
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Add Products
          </NavItem>

          <NavItem pl="6" py="1" submenu={true}>
            Variations
          </NavItem>

          <NavItem pl="6" py="1" submenu={true}>
            Units
          </NavItem>

          <NavItem pl="6" py="1" submenu={true}>
            Categories
          </NavItem>

          <NavItem pl="6" py="1" submenu={true}>
            Brands / Company
          </NavItem>

        </Submenu>

        <Submenu
          icon={BsFillArrowDownCircleFill}
          title={'Purchases'}
        >
          <NavItem pl="6" py="1" submenu={true}>
            Purchases List
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Add Purchase
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Return List
          </NavItem>
        </Submenu>

        <Submenu
          icon={BsFillArrowUpCircleFill}
          title={'Sells'}
        >
          <NavItem pl="6" py="1" submenu={true}>
            All Sells
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Add Sell
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            List POS
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Sell Returns
          </NavItem>
        </Submenu>


        <Submenu
          icon={FaMinusCircle}
          title={'Expenses'}
        >
          <NavItem pl="6" py="1" submenu={true}>
            Expenses List
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Add Expenses
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            List POS
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Sell Returns
          </NavItem>
        </Submenu>

        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );

  return (

    <Box as="section" bg="gray.50" minH="100vh">

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


      <Box ml={{ base: 0, md: 60 }}>

        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="turquoise"
          // borderBottomWidth="2px"
          borderColor='blackAlpha.200'
          color="black"
          h="14"
          shadow={'sm'}
        >

          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
            color={'black'}
          />

          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.900">
              <FiSearch />
            </InputLeftElement>
            <Input
              bg='blackAlpha.100'
              _hover={{
                borderColor: 'blackAlpha.100'
              }}
              _focus={{
                ring: '0',
                borderColor: 'blackAlpha.100'
              }}
              border='0px'
              borderColor='blackAlpha.50'
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

        <Box as="main">
          <Box h={200} w='full' bgGradient='linear(to-b, turquoise, #40e0d000)' roundedBottom={'30px'}>

          </Box>





        </Box>
      </Box>
    </Box>
  );
};
