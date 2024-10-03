import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react';
import { Title, createStyles } from '@mantine/core';
import Link from 'next/link';
import Logo from '../Logo';
import Navbar from './Navbar';

const useStyles = createStyles((theme) => ({


  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },
}));

export default function Header() {
  const { classes, cx } = useStyles();

  return (
    <Box
      position='relative'

      bgImage='https://uploads-ssl.webflow.com/60edc0a8835d5b38bf11f03f/61cf04ea45898934315251e5_Inventory-management-system-objectives.png'
      bgSize='cover'
      bgPosition='center'
    >
      <Box
        h={'full'}
        w={'full'}
        bgGradient='linear(to-b, blackAlpha.900, blackAlpha.500)'
      >

        <Navbar bg='white' />

        <Box
          paddingTop={200}
          paddingBottom={200}
        >
          <Box alignItems={'center'} textAlign='center'>

            <Container maxW={'2xl'}>
              <Text fontSize={32} casing='uppercase' fontWeight='bold' color={'white'} lineHeight='40px' zIndex={9999} mb={5}>
                The platform that your business needs to thrive.
              </Text>
              <Text lineHeight={'30px'} fontSize="2xl" className={classes.description}>
              Are you tired of juggling suppliers, struggling with inventory chaos, and losing precious customer loyalty? Tech-oak is here to revolutionise the way you manage your business!
              </Text>
            </Container>

            <Flex gap={2} className={classes.controls}>
              <Button colorScheme={'whiteAlpha'} size="lg">
                Get started
              </Button>
              <Link href={'/contact'}>
                <Button colorScheme={'teal'} size="lg">
                  Request a demo
                </Button>
              </Link>
            </Flex>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}