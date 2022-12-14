import { Box, Collapse, Icon, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import NavItem from './NavItem'

export default function Submenu({ icon, title, children, ...rest }) {

    const integrations = useDisclosure();


    return (
        <>
            <Box borderColor={integrations.isOpen ? 'turquoise' : 'white'} bgGradient={integrations.isOpen ? 'linear(to-tr, #40e0d00f, gray.50)' : ''}>
                <Box borderBottom={integrations.isOpen && "1px"} borderColor='blackAlpha.50' bg={integrations.isOpen && "#40e0d00f"}>
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
