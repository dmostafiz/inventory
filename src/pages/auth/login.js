import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import Logo from '../../Components/Logo';

export default function Login() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    // bg={useColorModeValue('gray.50', 'gray.800')}
    >

      <Stack w={{ base: 'full', md: 'lg' }} spacing={8} py={5} px={{ base: 2, md: 6 }}>

        <Stack align={'center'}>
          <Box pb={{ base: 5, md: 10 }}>
            <Link href='/'>
              <Logo />
            </Link>
          </Box>

          <Heading fontSize={{ base: 'xl', md: '3xl' }}>Sign in</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link href={'#'}>features</Link> ✌️
          </Text>
        </Stack>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={5}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link href={'#'}>Forgot password?</Link>
              </Stack>
              <Link href='/home'>
                <Button
                  bg={'turquoise'}
                  color={'white'}
                  _hover={{
                    bg: 'turquoise',
                  }}
                >
                  Sign in
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}