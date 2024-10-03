import { Box, Center, Flex } from "@chakra-ui/react";
import { IconAlertTriangle } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext, useRef } from "react";
import { AiFillGift } from "react-icons/ai";
import { BsCardChecklist, BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsGearFill } from "react-icons/bs";
import { FaMinusCircle, FaUserFriends } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdContacts, MdHome, MdPerson, MdSubscriptions } from "react-icons/md";
import { BusinessContext } from "../../Contexts/BusinessContext";
import Axios from "../../Helpers/Axios";
import useUser from "../../Hooks/useUser";
import Logo from "../Logo";
import MenuItem from "../Sidebar/MenuItem";
import NavItem from "../Sidebar/NavItem";
import Submenu from "../Sidebar/Submenu";
import StatsCard from "./Dashboard/StatCard";

export default function LeftSidebar(props) {

  const { isError, error, authUser, logoutUser } = useUser()
  const { business, hasBusiness } = useContext(BusinessContext)

  const { data, isLoading } = useQuery(['stockAlertssw'], async () => {
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

        {hasBusiness() && <MenuItem
          icon={MdHome}
          title='Dashboard'
          link='/home'
        />}

        {hasBusiness() && <MenuItem
          icon={MdContacts}
          title='Suppliers'
          link='/home/contacts/suppliers'
        />}

        {hasBusiness() && <MenuItem
          icon={MdPerson}
          title={business() && business()?.businessType == 'cantine' ? 'Students' : 'Customers'}
          link='/home/contacts/customers'
        />}


        {hasBusiness() && <MenuItem
          icon={AiFillGift}
          title='Products'
          submenus={[
            { title: 'Print Labels', link: '/home/products/labels', show: true },
            { title: 'Product List', link: '/home/products', show: true },
            { title: 'Add Products', link: '/home/products/add', show: true },
            // { title: 'Variations', link: '/home/products/variations', show: true },
            { title: 'Product Units', link: '/home/products/units', show: true },
            { title: 'Categories', link: '/home/products/categories', show: true },
            { title: 'Brands / Company', link: '/home/products/brands', show: true },
          ]}
        />}

        {hasBusiness() && <MenuItem
          icon={BsFillArrowDownCircleFill}
          title='Purchases'
          submenus={[
            { title: 'Purchases List', link: '/home/purchases', show: true },
            { title: 'Add Purchase', link: '/home/purchases/add', show: authUser?.business_role == 'admin' ? true : false },
            // { title: 'Return List', link: '/home/purchases/returns', show: true },
          ]}
        />}

        {hasBusiness() && <MenuItem
          icon={BsFillArrowUpCircleFill}
          title='Manage Sales'
          submenus={[
            { title: 'Sales Report', link: '/home/sales', show: true },
            { title: 'Add Sale', link: '/home/sales/add', show: true },
            { title: 'List POS', link: '/home/pos/list', show: true },
            { title: 'Profits', link: '/home/sales/profits', show: true },
            { title: 'Sale Returns', link: '/home/sales/returns', show: true },
          ]}
        />}


        {hasBusiness() && <MenuItem
          icon={FaMinusCircle}
          title='Expenses'
          submenus={[
            { title: 'Expenses List', link: '/home/expenses', show: true },
            { title: 'Add Expenses', link: '/home/expenses/add', show: true }
          ]}
        />}


        {hasBusiness() && authUser?.business_role == 'admin' && <MenuItem
          icon={FaUserFriends}
          title='Manage staff'
          link='/home/staff'
        />}


        {authUser?.business_role == 'admin' && <MenuItem
          icon={MdSubscriptions}
          title='Subscription'
          link='/home/subscription'
        />}


        <MenuItem
          icon={BsGearFill}
          title='Settings'
          submenus={[
            { title: 'General Settings', link: '/home/settings/general', show: (authUser?.business_role == 'admin' && hasBusiness()) ? true : false },
            { title: 'Profile Settings', link: '/home/settings/profile', show: true },
            { title: 'Business Settings', link: '/home/settings/business', show: authUser?.business_role == 'admin' ? true : false },
            { title: 'Tax Rates', link: '/home/settings/tax', show: (authUser?.business_role == 'admin' && hasBusiness()) ? true : false }
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