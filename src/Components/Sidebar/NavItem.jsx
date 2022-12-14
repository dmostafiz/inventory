import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";

const NavItem = (props) => {

    const color = useColorModeValue("gray.600", "gray.300");
    const { icon, children, submenu, ...rest } = props;

    return (
        <Flex
            align="center"
            px="3"
            pl="3"
            py="2"
            cursor="pointer"
            color="blackAlpha.700"
            borderBottom={submenu ? '0px' : '2px'}
            borderBottomColor='blackAlpha.50'
            _hover={{
                bgGradient: submenu ? 'none' : 'linear(to-tr, whiteAlpha.500, whiteAlpha.200)',
                color: "blackAlpha.900",
            }}
            role="group"
            fontWeight={'normal'}
            fontSize={submenu? '15px': '16px'}
            transition="0s ease"
        
            {...rest}
        >
            {icon && (
                <Icon
                    mx="2"
                    boxSize="4"
                    _groupHover={{
                        color: "blackAlpha.900",
                    }}
                    as={icon}
                />
            )}

            {submenu && (
                <Icon
                    mx="1"
                    boxSize="4"
                    _groupHover={{
                        color: "blackAlpha.900",
                    }}
                    as={BsArrowRight}
                />
            )}
            {children}
        </Flex>
    );
};

export default NavItem