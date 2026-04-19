import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Category from './Category'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector((store)=>store.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user && user.role=='recruiter'){
      navigate('/admin/companies')
    }
  },[user])
  useGetAllJobs()
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