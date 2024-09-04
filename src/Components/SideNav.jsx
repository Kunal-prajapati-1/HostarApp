/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdTrendingUp } from "react-icons/io";
import { RiMagicFill } from "react-icons/ri";
import { RiMovie2Fill } from "react-icons/ri";
import { IoInformationCircle } from "react-icons/io5";
const SideNav = () => {
  return (
    <div className='h-screen w-[17%]  bg-[#1F1E24] p-4 pl-[1.5vw]'>
        <Link to='/' className="logo flex items-center ">
           <img className='h-[3.2vw] ' src="public\logo.svg" alt="logo" />
        </Link>
        <div className="tagContainer mt-6">
            <div className="title text-[1.6vw] text-zinc-300 font-bold">
                New Feeds
            </div>
            <div className="links flex pb-[1.5vw] flex-col mt-[1vw] pl-[.5vw] gap-[2.2vw] border-b-[.1vw] border-zinc-400">
                <Link to="/trendingPage" className='text-[1.2vw] hover:text-white duration-500 capitalize text-zinc-400 font-semibold flex items-center gap-[.5vw]'>
                <IoMdTrendingUp/> trending</Link>
                <Link to="/popular" className='text-[1.2vw] hover:text-white duration-500 capitalize text-zinc-400 font-semibold flex items-center gap-[.5vw]'>
                <RiMagicFill/> popular</Link>
                <Link to="/Movie" className='text-[1.2vw] hover:text-white duration-500 capitalize text-zinc-400 font-semibold flex items-center gap-[.5vw]'>
                <RiMovie2Fill/> Movies</Link>
                <Link to="/tvShows" className='text-[1.2vw] hover:text-white duration-500 capitalize text-zinc-400 font-semibold flex items-center gap-[.5vw]'>
                <i className="ri-tv-2-fill"></i> tv shows</Link>
                <Link to="/Person" className='text-[1.2vw] hover:text-white duration-500 capitalize text-zinc-400 font-semibold flex items-center gap-[.5vw]'>
                <i className="ri-team-fill"></i> peoples</Link>
               
            </div>
        </div>
        <div className="tagContainer2 mt-6">
            <div className="title text-[1.2vw] text-zinc-300 font-semibold  items-center">
             Information
            </div>
            <div className="links flex pb-[1.1vw] flex-col mt-[1vw] pl-[.7vw] gap-[1vw] ">
              
                <Link className='text-[1.1vw] hover:text-white duration-500 capitalize text-zinc-400 font-semibold flex items-center gap-[.5vw]'>
                <IoInformationCircle/>about hotstar</Link>
               
                <Link className='text-[1.1vw] hover:text-white duration-500 capitalize text-zinc-400 font-semibold flex items-center gap-[.5vw]'>
                <i className="ri-phone-fill"></i> Contact Us</Link>
            </div>
        </div>
    </div>
  )
}

export default SideNav