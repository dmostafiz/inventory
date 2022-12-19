import { Center, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import ComponentLoader from '../Components/ComponentLoader'
import useUser from '../Hooks/useUser'

export default function HomeWrapper({ children }) {
  const router = useRouter()
  const { isLoading, authUser } = useUser()

  if (!isLoading && !authUser) {
    router.push('/auth/login')
  }

  return (
    <>
      {isLoading
        ? <Center minH='100vh'>
          <ComponentLoader />
        </Center>

        : (!isLoading && authUser)

          ? children

          : <Center minH='100vh'>
            <ComponentLoader />
          </Center>
      }
    </>
  )
}
