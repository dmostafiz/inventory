import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillGift } from "react-icons/ai";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsGearFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { MdContacts, MdHome } from "react-icons/md";
import Logo from "../Logo";
import NavItem from "../Sidebar/NavItem";
import Submenu from "../Sidebar/Submenu";

export default function LeftSidebar(props) {

  return <Box
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
    // bgGradient='linear(to-t, turquoise, white)'
    border
    color="inherit"
    w="60"
    shadow={'lg'}
    borderRight='0px'
    borderColor={'blackAlpha.200'}
    {...props}
  >
    <Box
      // bg='turquoise'
      h='14'
      py={1}
      px={3}
      mb={5}
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

      <Box
        borderLeft={'4px'}
        borderLeftColor='white'
        _hover={{
          borderLeftColor:'turquoise'
        }}
      >
        <Link href='/home'>
          <NavItem icon={MdHome}>Home</NavItem>
        </Link>
      </Box>
      {/* <NavItem icon={FaRss}>Articles</NavItem> */}
      {/* <NavItem icon={HiCollection}>Collections</NavItem> */}
      {/* <NavItem icon={FaClipboardCheck}>Checklists</NavItem> */}

      <Box
        borderLeft={'4px'}
        borderLeftColor='white'
        _hover={{
          borderLeftColor:'turquoise'
        }}
      >
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
      </Box>

      <Box
        borderLeft={'4px'}
        borderLeftColor='white'
        _hover={{
          borderLeftColor:'turquoise'
        }}
      >
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
      </Box>

      <Box
        borderLeft={'4px'}
        borderLeftColor='white'
        _hover={{
          borderLeftColor:'turquoise'
        }}
      >
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
      </Box>

      <Box
        borderLeft={'4px'}
        borderLeftColor='white'
        _hover={{
          borderLeftColor:'turquoise'
        }}
      >
        <Submenu
          icon={BsFillArrowUpCircleFill}
          title={'Sales'}
        >
          <NavItem pl="6" py="1" submenu={true}>
            All Sales
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Add Sale
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            List POS
          </NavItem>
          <NavItem pl="6" py="1" submenu={true}>
            Sell Returns
          </NavItem>
        </Submenu>
      </Box>


      <Box
        borderLeft={'4px'}
        borderLeftColor='white'
        _hover={{
          borderLeftColor:'turquoise'
        }}
      >
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
      </Box>

      <Box
        borderLeft={'4px'}
        borderLeftColor='white'
        _hover={{
          borderLeftColor:'turquoise'
        }}
      >
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Box>
    </Flex>
  </Box>
}