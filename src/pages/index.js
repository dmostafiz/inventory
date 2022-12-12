import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import SectionOne from '../Components/LandingPage/SectionOne'
import Header from '../Components/LandingPage/Header'
import SectionTwo from '../Components/LandingPage/SectionTwo'
import Testimonial from '../Components/LandingPage/Testimonials'
import Footer from '../Components/LandingPage/Footer'

export default function Home() {
  return (
    <Box w='full'>
      <Header />
      <SectionTwo />
      <SectionOne />
      <Testimonial />
      <Footer/>
    </Box>
  )
}
