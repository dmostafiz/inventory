import { Card, CardBody, CardHeader, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import ChangePassword from '../../../../Components/home/Dashboard/Profile/ChangePassword'
import ProfileInfo from '../../../../Components/home/Dashboard/Profile/ProfileInfo'
import ProfileUpdate from '../../../../Components/home/Dashboard/Profile/ProfileUpdate'
import useUser from '../../../../Hooks/useUser'
import Layout from '../../../../Layouts/Home/Layout'

export default function index() {

    const { isError, error, authUser, isLoading, logoutUser } = useUser()


    return (
        <Layout
            title='Profile'
            breads={[
                { title: 'Settings', link: '#' },
                { title: 'Profile', link: '/home/settings/profile' },
            ]}
        >
            <Card flex='1' shadow={'md'} bg='white'>
                <CardHeader py={3} borderBottom={'2px'} borderColor='gray.100' mb={2}>
                    <Heading size='md'>User Profile</Heading>
                </CardHeader>
                <CardBody p={0}>

                    <Tabs colorScheme={'teal'}>
                        
                        <TabList>
                            <Tab>Profile Information</Tab>
                            <Tab>Update Profile</Tab>
                            <Tab isSelecte={true}>Change Password</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <ProfileInfo user={authUser} />
                            </TabPanel>
                            <TabPanel>
                                <ProfileUpdate />
                            </TabPanel>
                            <TabPanel isSelecte={true}>
                                <ChangePassword />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </CardBody>
            </Card>
        </Layout>

    )
}
