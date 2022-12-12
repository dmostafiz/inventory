import { Box, Collapse, Icon, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import NavItem from './NavItem'

export default function Submenu({ icon, title, children, ...rest }) {

    const integrations = useDisclosure();


    return (
        <>
            <NavItem icon={icon && icon} onClick={integrations.onToggle} {...rest}>
                {title}
                <Icon
                    as={MdKeyboardArrowRight}
                    ml="auto"
                    transform={integrations.isOpen && "rotate(90deg)"}
                />
            </NavItem>
            <Collapse in={integrations.isOpen}>
                <Box bgGradient='linear(to-tr, whiteAlpha.500, whiteAlpha.200)'>
                    {children}
                </Box>
            </Collapse>
        </>
    )
}
