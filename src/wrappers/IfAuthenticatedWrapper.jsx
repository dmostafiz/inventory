import { Center, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import ComponentLoader from '../Components/ComponentLoader'
import useUser from '../Hooks/useUser'

export default function IfAuthenticatedWrapper({ children }) {
  const router = useRouter()
  const { isLoading, authUser } = useUser()

  if (!isLoading && authUser) {
    window.location.href = '/home'
  }

  return (
    <>
      {isLoading
        ? <Center minH='100vh'>
          <ComponentLoader />
        </Center>

        : (!isLoading && !authUser)

          ? children

          : <Center minH='100vh'>
            <ComponentLoader />
          </Center>
      }
    </>
  )
}
