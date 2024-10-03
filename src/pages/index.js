import { Box } from '@chakra-ui/react'
import SectionOne from '../Components/LandingPage/SectionOne'
import Header from '../Components/LandingPage/Header'
import SectionLast from '../Components/LandingPage/SectionTwo'
import Testimonial from '../Components/LandingPage/Testimonials'
import Footer from '../Components/LandingPage/Footer'
import SectionTwo from '../Components/LandingPage/SectionTwo'
import SectionThree from '../Components/LandingPage/SectionThree'
import SectionFours from '../Components/LandingPage/SectionFours'
import SectionFive from '../Components/LandingPage/SectionFive'
import SectionSix from '../Components/LandingPage/SectionSix'

export default function Home() {
  return (
    <Box w='full'>
      <Header />
      {/* <SectionTwo /> */}
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFours />
      <SectionFive />
      <SectionSix />
      {/* <Testimonial /> */}
      <Footer/>
    </Box>
  )
}
