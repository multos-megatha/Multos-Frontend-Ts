
import Footer from '@/sections/Footer'
import Hero from '@/sections/Hero'
import Navbar from '@/sections/Navbar'
import React from 'react'

const MainPage = () => {
  const widthNavbar = 'max-w-[60rem]'
  return (
    <>
        <Navbar/>
        <Hero/>
        <Footer/>
    </>
  )
}

export default MainPage