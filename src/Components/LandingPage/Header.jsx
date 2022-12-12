import { Box, Container, Flex, Image, Text } from '@chakra-ui/react';
import { Title, Button, createStyles } from '@mantine/core';
import Link from 'next/link';
import Logo from '../Logo';

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

      bgImage='https://images.unsplash.com/photo-1573164713988-8665fc963095?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=980&q=80'
      bgSize='cover'
      bgPosition='center'
    >
      <Box
        h={'full'}
        w={'full'}
        bgGradient='linear(to-r, blackAlpha.700, blackAlpha.400)'
      >

        <Container
          py={3}
          maxW='6xl'
        >

          <Flex alignItems='center' justify='space-between'>
           
           <Logo />

            <Flex alignItems='center' gap={2}>
              <Link href='/auth/login'>
                <Button className={classes.control}>Store login</Button>
              </Link>
              <Link href='/auth/register'>
                <Button className={cx(classes.control, classes.secondaryControl)}>Create account</Button>
              </Link>
            </Flex>

          </Flex>
        </Container>

        <Box
          paddingTop={150}
          paddingBottom={120}
        >
          <Box alignItems={'center'} textAlign='center'>

            <Container maxW={'2xl'}>
              <Text fontSize={56} casing='uppercase' fontWeight='bold' color={'white'} lineHeight='59px' zIndex={9999} mb={5}>
                Automated AI code reviews for
              </Text>
              <Text lineHeight={'30px'} fontSize="2xl" className={classes.description}>
                Build more reliable software with AI companion. AI is also trained to detect lazy
                developers who do nothing and just complain on Twitter.
              </Text>
            </Container>

            <Flex gap={2} className={classes.controls}>
              <Button className={classes.control} variant="white" size="lg">
                Get started
              </Button>
              <Link href={'/contact'}>
                <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
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