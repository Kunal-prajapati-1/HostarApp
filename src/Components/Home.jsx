/* eslint-disable no-unused-vars */
import React from 'react'
import HomeContent from './HomeContent'
import SideNav from './SideNav'

const Home = () => {
  return (
    <div className="h-screen w-full bg-slate-300 flex">
      <SideNav/>
      <HomeContent/>
    </div>
  )
}

export default Home