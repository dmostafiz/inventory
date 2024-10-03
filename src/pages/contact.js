import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import Navbar from '../Components/LandingPage/Navbar';
import Footer from '../Components/LandingPage/Footer';

export default function contact() {
  return (
    <>
      <Navbar />
      <Container h='100vh' maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
            bg="teal"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}>
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.50">
                      Ready to take the leap? Connect with us to explore <br /> the possibilities that Tech-oak can bring to 
                      your <br /> retail business
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <Flex direction={'column'} alignItems={'flex-start'} justify={'flex-start'} pl={0} spacing={3} >
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: '0px solid #DCE2FF' }}
                          leftIcon={<MdPhone color="#DCE2FF" size="20px" />}>
                          +254799947883
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: '0px solid #DCE2FF' }}
                          leftIcon={<MdEmail color="#DCE2FF" size="20px" />}>
                        techoak.info@gmail.com
                        </Button>
         
                      </Flex>
                    </Box>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<BsPerson color="gray.800" />}
                            />
                            <Input type="text" size="md" />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Mail</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdOutlineEmail color="gray.800" />}
                            />
                            <Input type="text" size="md" />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: 'gray.300',
                            }}
                            placeholder="message"
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            variant="solid"
                            bg="#0D74FF"
                            color="white"
                            _hover={{}}>
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}