import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FaBell, FaPowerOff, FaUser } from 'react-icons/fa'
import { FiMenu, FiSearch } from 'react-icons/fi'
import LogoMobile from '../LogoMobile'

import useUser from '../../Hooks/useUser'
import Link from 'next/link'
import Logo from '../Logo'


export default function TopBar({ layoutWidth, sidebar, showSidebar }) {

    const { isError, error, authUser, isLoading, logoutUser } = useUser()

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px={{ base: 2, md: 5 }}
            bg="#78DCCE"
            // borderBottomWidth="2px"
            // borderColor='blackAlpha.50'
            color="black"
            h="14"
            shadow={'sm'}
        >

            <Box
                display={{ base: "inline-flex", md: "none" }}
            >
                <LogoMobile bg='white' />
            </Box>

            {!showSidebar &&
                <Box py={2}>
                    <Link href='/home'>
                        <Logo bg='white' rounded={'none'} />
                    </Link>
                </Box>
            }

            <InputGroup w="96" display={{ base: "none", md: "flex" }}>
                <InputLeftElement color="gray.900">
                    <FiSearch />
                </InputLeftElement>
                <Input
                    bg='whiteAlpha.700'
                    _hover={{
                        borderColor: 'blackAlpha.100'
                    }}
                    _focus={{
                        ring: '0',
                        borderColor: 'blackAlpha.100',
                        shadow: 'md'
                    }}
                    shadow={'sm'}
                    border='0px'
                    borderColor='blackAlpha.50'
                    placeholder="Search for products..."
                    rounded={'full'}
                />
            </InputGroup>

            <Flex align="center" gap={5}>
                <Link href={'/home/pos'}>
                    <Button size={'sm'} rounded='full' bg={'blackAlpha.300'} _active color='whiteAlpha.900' _hover shadow='sm'>
                        POINT OF SALES
                    </Button>
                </Link>

                <Icon fontSize={'20px'} color="blackAlpha.800" as={FaBell} cursor="pointer" />

                <Menu>
                    <MenuButton as={Button} bg='transparent' rightIcon={<ChevronDownIcon />}>
                        <Avatar
                            // ml="4"
                            size="sm"
                            name="anubra266"
                            src="https://avatars.githubusercontent.com/u/30869823?v=4"
                            cursor="pointer"
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<FaUser />}>Profile Settings</MenuItem>
                        <MenuItem icon={<FaPowerOff />}>Business Settings</MenuItem>
                        <MenuItem icon={<FaPowerOff />} onClick={() => logoutUser()}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>


            <IconButton
                aria-label="Menu"
                display={{ base: "inline-flex", md: "none" }}
                onClick={sidebar.onOpen}
                icon={<FiMenu />}
                size="sm"
                color={'black'}
            />

        </Flex>
    )
}
