import { Avatar, Flex, Icon, IconButton, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FaBell } from 'react-icons/fa'
import { FiMenu, FiSearch } from 'react-icons/fi'

export default function TopBar({sidebar}) {

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px={{base:2, md:5}}
            bg="#dce0cd"
            // borderBottomWidth="2px"
            // borderColor='blackAlpha.50'
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
    )
}