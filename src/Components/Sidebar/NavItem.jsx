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
            color="whiteAlpha.800"
            _dark={{ color: "gray.400" }}
            _hover={{
                bg: "whiteAlpha.100",
                _dark: { bg: "gray.900" },
                color: "whiteAlpha.900",
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
                        color: "whiteAlpha.900",
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};

export default NavItem