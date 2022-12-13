import { Box, Collapse, Icon, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import NavItem from './NavItem'

export default function Submenu({ icon, title, children, ...rest }) {

    const integrations = useDisclosure();


    return (
        <>
            <Box borderLeft={integrations.isOpen ? '2px' : '0px'} borderColor='blackAlpha.500' bgGradient={integrations.isOpen ? 'linear(to-tr, whiteAlpha.500, whiteAlpha.200)' : ''}>
                <Box borderBottom={integrations.isOpen && "1px"} borderColor='blackAlpha.50' bg={integrations.isOpen && "whiteAlpha.400"}>
                    <NavItem icon={icon && icon} onClick={integrations.onToggle} {...rest}>
                        {title}
                        <Icon
                            as={MdKeyboardArrowRight}
                            ml="auto"
                            transform={integrations.isOpen && "rotate(90deg)"}
                        />
                    </NavItem>
                </Box>
                <Collapse in={integrations.isOpen}>
                    {children}
                </Collapse>
            </Box>
        </>
    )
}
