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
  FormErrorMessage,
} from '@chakra-ui/react';
import Link from 'next/link';
import Logo from '../../Components/Logo';
import useLogin from '../../Hooks/useLogin';
import IfAuthenticatedWrapper from '../../wrappers/IfAuthenticatedWrapper';

export default function Login() {
  const { responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting, googleLoading, fbLoading } = useLogin('/home')
  return (
    <IfAuthenticatedWrapper>
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
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder='Enter your login email'
                  {...register('email')}
                />

                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder='Enter your password'
                  {...register('password')}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
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
                    loadingText="Loging in..."
                    isLoading={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign in
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have any account? <Link href='/auth/register' color={'blue.400'}>Create Now</Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </IfAuthenticatedWrapper>
  );
}