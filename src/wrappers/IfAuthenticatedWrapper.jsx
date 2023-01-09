import { Center, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import ComponentLoader from '../Components/ComponentLoader'
import { getAccessToken } from '../Helpers/cookieHelper'
import useUser from '../Hooks/useUser'

export default function IfAuthenticatedWrapper({ children }) {
  const router = useRouter()
  const { isLoading, authUser } = useUser()
  const accessToken = getAccessToken()

  if (!isLoading && authUser) {
    window.location.href = '/home'
  }

  return (
    <>
      {!accessToken && isLoading
        ? <Center minH='100vh'>
          <ComponentLoader />
        </Center>

        : (!isLoading && !authUser && !accessToken)

          ? children

          : <Center minH='100vh'>
            <ComponentLoader />
          </Center>
      }
    </>
  )
}
