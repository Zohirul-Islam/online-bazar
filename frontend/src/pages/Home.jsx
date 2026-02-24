import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletterbox from '../components/NewsLetterBox'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Bestseller />
      <OurPolicy />
      <Newsletterbox />
      <Footer/>
    </div>
  )
}

export default Home