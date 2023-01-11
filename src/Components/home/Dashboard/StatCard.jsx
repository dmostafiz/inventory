import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';


export default function StatsCard({ title, stat, icon, iconBg = '#88A47C', loading, link = null }) {

    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'3'}
            shadow={'md'}
            // border={'1px solid'}
            bg='white'
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            // rounded={'lg'}
        >
            <Flex gap={{ base: 3, md: 5 }} alignItems='center'>
                <Box
                    // my={'auto'}
                    color={'white'}
                    alignContent={'center'}
                    bg={iconBg}
                    rounded='full'
                    p={4}
                >
                    {icon}
                </Box>

                <Box>
                    <StatLabel fontSize={{ base: 'xs', md: 'sm' }} color='gray.400'>
                        {title}
                    </StatLabel>
                    {!loading ? <StatNumber fontSize={{ base: 'md', md: 'lg' }} color='#00453D' fontWeight={'black'}>
                        {stat}
                    </StatNumber> : <Spinner />}
                    {link && <Link href={link.url}>
                        <Text fontSize={'12px'} color='blue.500'>{link.title}</Text>
                    </Link>}
                </Box>

            </Flex>
        </Stat>
    );
}

