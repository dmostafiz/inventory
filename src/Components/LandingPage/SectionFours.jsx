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

export default function SectionFours() {
  return (
    <Box bg={'gray.50'}>
      <Container maxW={'6xl'} py={24}>
        <Flex direction={{ base: 'column-reverse', lg: 'row' }} gap={10} alignItems={'center'}>

          <Flex flex={1}>
            <Image
              rounded={'3xl'}
              alt={'feature image'}
              src={
                'https://images.ctfassets.net/3q1a0w8cwuwf/1bt7YMbM9mLvxCmfVcZzYq/e41d1f8a8a942a822c353254fe30ae4e/7_Tested_Ways_to_Build_Customer_Loyalty.jpg'
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
            <Heading>Boost Customer Loyalty</Heading>
            <Text color={'gray.500'} fontSize={'xl'}>
              Keep customers coming back for more with tailor-made loyalty programs, enticing offers, and exceptional service.
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