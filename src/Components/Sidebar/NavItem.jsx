import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

const NavItem = (props) => {

    const color = useColorModeValue("gray.600", "gray.300");
    const { icon, children, ...rest } = props;

    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            color="blackAlpha.700"
            _hover={{
                bgGradient: 'linear(to-tr, whiteAlpha.500, whiteAlpha.200)',
                color: "blackAlpha.800",
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
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
            {children}
        </Flex>
    );
};

export default NavItem