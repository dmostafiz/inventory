import { Box, Collapse, Icon, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import NavItem from './NavItem'

export default function Submenu({ icon, title, children, routes = [], ...rest }) {

    const router = useRouter()

    // useEffect(() => {

    //     console.log('Router', router)
    // }, [])

    const integrations = useDisclosure();

    return (
        <>
            <Box
                borderColor={integrations.isOpen ? 'turquoise' : 'white'}
                bgGradient={integrations.isOpen || routes?.includes(router.pathname) ? 'linear(to-tr, #40e0d00f, gray.50)' : ''}
            >
                <Box borderBottom={(integrations.isOpen || routes?.includes(router.pathname)) && "1px"} borderColor='blackAlpha.50' bg={(routes?.includes(router.pathname) || integrations.isOpen) && "#40e0d00f"}>
                    <NavItem icon={icon && icon} routes={routes} onClick={integrations.onToggle} {...rest}>
                        {title}
                        <Icon
                            as={MdKeyboardArrowRight}
                            ml="auto"
                            transform={(!routes?.includes(router.pathname) && integrations.isOpen) && "rotate(90deg)"}
                        />
                    </NavItem>
                </Box>
                <Collapse in={integrations.isOpen || routes?.includes(router.pathname)}>
                    {children}
                </Collapse>
            </Box>
        </>
    )
}
