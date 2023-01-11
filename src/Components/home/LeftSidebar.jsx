import { Box, Center, Flex } from "@chakra-ui/react";
import { IconAlertTriangle } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AiFillGift } from "react-icons/ai";
import { BsCardChecklist, BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsGearFill } from "react-icons/bs";
import { FaMinusCircle } from "react-icons/fa";
import { MdContacts, MdHome } from "react-icons/md";
import Axios from "../../Helpers/Axios";
import Logo from "../Logo";
import MenuItem from "../Sidebar/MenuItem";
import NavItem from "../Sidebar/NavItem";
import Submenu from "../Sidebar/Submenu";
import StatsCard from "./Dashboard/StatCard";

export default function LeftSidebar(props) {

  const { data, isLoading } = useQuery(['stockAlerts'], async () => {
    const res = await Axios.get('/report/get_stock_alerts')
    // console.log('Product stock alerts', res.data)
    return res?.data
  })

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
    shadow={'md'}
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
      justify={'space-between'}
      minHeight='85vh'
    >


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
            { title: 'Print Labels', link: '/home/products/labels' },
            { title: 'Product List', link: '/home/products' },
            { title: 'Add Products', link: '/home/products/add' },
            // { title: 'Variations', link: '/home/products/variations' },
            { title: 'Product Units', link: '/home/products/units' },
            { title: 'Categories', link: '/home/products/categories' },
            { title: 'Brands / Company', link: '/home/products/brands' },
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
            { title: 'Business Settings', link: '/home/settings/business' },
            { title: 'Tax Rates', link: '/home/settings/tax' }
          ]}
        />
      </Flex>


      <Flex direction={'column'} gap={2}>
        <Center p={0}>
          <StatsCard
            title={'Stock Alert'}
            stat={(data?.products?.length || 0) + ' products'}
            // loading={headingReport?.isLoading}
            icon={<IconAlertTriangle size={'1.5em'} />}
            iconBg='orange.400'
            link={{
              title: 'View stock alerts',
              url: '/home/purchases?status=paid'
            }}
          />
        </Center>
        <Center p={0}>
          <StatsCard
            title={'Total Expenses'}
            stat={data?.products?.length}
            // loading={headingReport?.isLoading}
            icon={<BsCardChecklist size={'1.5em'} />}
            iconBg='gray.400'
            link={{
              title: 'View Expenses',
              url: '/home/expenses'
            }}
          />
        </Center>
      </Flex>

    </Flex>
  </Box>
}