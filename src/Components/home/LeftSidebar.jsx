import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillGift } from "react-icons/ai";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsGearFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { MdContacts, MdHome } from "react-icons/md";
import Logo from "../Logo";
import MenuItem from "../Sidebar/MenuItem";
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
    bg="white"
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


      <MenuItem
        icon={MdHome}
        title='Home'
        link='/home'
      />

      <MenuItem
        icon={MdContacts}
        title='Contacts'
        submenus={[
          { title: 'Suppliers', link: '/home/contacts/suppliers' },
          { title: 'Customers', link: '/home/contacts/customers' },
        ]}
      />

      <MenuItem
        icon={AiFillGift}
        title='Products'
        submenus={[
          { title: 'Product List', link: '/home/products' },
          { title: 'Add Products', link: '/home/products/add' },
          { title: 'Variations', link: '/home/products/variations' },
          { title: 'Units', link: '/home/products/units' },
          { title: 'Categories', link: '/home/products/categories' },
          { title: ' Brands / Company', link: '/home/products/brands' }
        ]}
      />

      <MenuItem
        icon={BsFillArrowDownCircleFill}
        title='Purchases'
        submenus={[
          { title: 'Purchases List', link: '/home/purchases' },
          { title: 'Add Purchase', link: '/home/purchases/add' },
          { title: 'Return List', link: '/home/purchases/returns' },
        ]}
      />

      <MenuItem
        icon={BsFillArrowUpCircleFill}
        title='Sales'
        submenus={[
          { title: 'All Sales', link: '/home/sales' },
          { title: 'Add Sale', link: '/home/sales/add' },
          { title: 'List POS', link: '/home/pos/list' },
          { title: 'Sale Returns', link: '/home/sales/returns' },
        ]}
      />


      <MenuItem
        icon={FaMinusCircle}
        title='Expenses'
        submenus={[
          { title: 'Expenses List', link: '/home/expenses' },
          { title: 'Add Expenses', link: '/home/expenses/add' }
        ]}
      />


      <MenuItem
        icon={BsGearFill}
        title='Settings'
        submenus={[
          { title: 'General Settings', link: '#' },
          { title: 'Profile Settings', link: '#' },
          { title: 'Business Settings', link: '/home/settings/business' }
        ]}
      />

    </Flex>
  </Box>
}