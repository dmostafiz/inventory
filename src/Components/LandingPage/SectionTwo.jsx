import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from 'react-icons/io5';
import { ReactElement } from 'react';

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SectionTwo() {
  return (
    <Box bg={'gray.50'}>
      <Container maxW={'6xl'} py={24}>
        <Flex direction={{ base: 'column-reverse', lg: 'row' }} gap={10} alignItems={'center'}>

          <Flex flex={1}>
            <Image
              rounded={'3xl'}
              alt={'feature image'}
              src={
                'https://www.omegacube.com/wp-content/uploads/2018/11/Image-for-Blogs_ivnentory-1024x621.jpg'
              }
              objectFit={'cover'}
            />
          </Flex>

          <Stack spacing={4} flex={1}>
            {/* <Text
            textTransform={'uppercase'}
            color={'turquoise'}
            fontWeight={600}
            fontSize={'sm'}
            bg={'#40e0d02e'}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our services
          </Text> */}
            <Heading> Streamline Supplier Relations</Heading>
            <Text color={'gray.500'} fontSize={'xl'}>
            Effortlessly manage your suppliers, communicate seamlessly, and ensure a dependable supply chain.
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>

              {/* <Feature
              icon={
                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Market Analysis'}
            /> */}
            </Stack>
          </Stack>

        </Flex>
      </Container>
    </Box>
  );
}