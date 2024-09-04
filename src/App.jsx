/* eslint-disable no-unused-vars */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import TrendingPage from './Components/TrendingPage'
import Popular from './Components/Popular'
import Movie from './Components/Movie'
import TvShows from './Components/TvShows'
import Person from './Components/Person'
import MovieDetails from './Components/partials/MovieDetails'
import TvShowsDetails from './Components/partials/TvShowsDetails'
import PeoplesDetails from './Components/partials/PersonDetails'
import PersonDetails from './Components/partials/PersonDetails'
// import LocomotiveScroll from 'locomotive-scroll';

const App = () => {
  // const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className=' h-screen bg-[1E1F24] w-full text-white'>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/TrendingPage" element={<TrendingPage/>}></Route>
        <Route path="/Popular" element={<Popular/>}></Route>
        <Route path="/Movie" element={<Movie/>}></Route>
        <Route path="/Movie/Details/:id" element={<MovieDetails/>}></Route>
        <Route path="/TvShows" element={<TvShows/>}></Route>
        <Route path="/Tv/Details/:id" element={<TvShowsDetails/>}></Route>
        <Route path="/Person" element={<Person/>}></Route>
        <Route path="/Person/Details/:id" element={<PersonDetails/>}></Route>
      </Routes>
    </div>
  )
}

export default App