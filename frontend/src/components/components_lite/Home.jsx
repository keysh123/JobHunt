import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Category from './Category'
import LatestJobs from './LatestJobs'
import Footer from './Footer'

const Home = () => {
  return (
    <>
    {/* <Navbar/> */}
    <Header/>
    <Category/>
    <LatestJobs/>
    {/* <Footer/> */}
    </>
  )
}

export default Home