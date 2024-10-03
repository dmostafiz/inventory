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
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import Navbar from '../../Components/LandingPage/Navbar';
import Logo from '../../Components/Logo';
import useLogin from '../../Hooks/useLogin';
import IfAuthenticatedWrapper from '../../wrappers/IfAuthenticatedWrapper';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {

  const router = useRouter()
  const toast = useToast()
  
  const handleSubmit = async () => {

    setTimeout(() => {
      toast({
        title: 'Check Email!',
        description: "You should receive a new password in your mail box.",
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
    })
      router.push('/auth/login')
    }, 5000)

  }

  return (
    <>
      <Navbar />
      <Flex
        // minH={'100vh'}
        align={'center'}
        justify={'center'}
      // bg={useColorModeValue('gray.50', 'gray.800')}
      >

        <Stack w={{ base: 'full', md: 'lg' }} spacing={8} py={20} px={{ base: 2, md: 6 }}>

          <Stack align={'center'}>
            {/* <Box pb={{ base: 5, md: 10 }}>
              <Link href='/'>
                <Logo />
              </Link>
            </Box> */}

            <Heading fontSize={{ base: 'xl', md: '3xl' }}>Recover forgotten password</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
             Enter your email to get a new password
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
                <Input
                  type="email"
                  placeholder='Enter your login email'
                  // {...register('email')}
                />

                {/* <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage> */}
              </FormControl>

              <Stack spacing={10}>
                <Link href='/home'>
                  <Button
                    bg={'turquoise'}
                    color={'white'}
                    _hover={{
                      bg: 'turquoise',
                    }}
                    loadingText="Loging in..."
                    // isLoading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Send new password
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}