/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "../Utils/Axios";
import { Link, useParams } from "react-router-dom";
import HeaderLoading from "./partials/HeaderLoading";
import asyncMovieLoad, { removeMovie } from "../store/actions/MovieActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [poster, setPoster] = useState(null);
  const [pause, setPause] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [id, setId] = useState(null);
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const getHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/movie/day`);
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setPoster(data.results[randomIndex]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!poster) {
      getHeader();
    } else {
      setId(poster.id);
    }
  }, [poster]);

  useEffect(() => {
    if (id) {
      dispatch(asyncMovieLoad(id));
      return () => {
        dispatch(removeMovie());
      };
    }
  }, [id, dispatch]);

  return poster && info ? (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original/${
            poster.backdrop_path || poster.profile_path
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 20%",
        }}
        className="relative w-full min-h-[63%] flex flex-col justify-end px-[2vw]"
      >
        <div className="details flex flex-col gap-[.2vw] mb-[2vw]">
          <div className="title flex gap-5 mb-2 items-center">
            <div className="mediaType flex items-center gap-2">
              <i className="text-[1.5vw] text-yellow-500 ri-album-fill"></i>
              <h2 className="text-[1.5vw] font-bold uppercase">
                {poster.media_type}
              </h2>
            </div>
            <h2 className="text-[1.8vw] text-white font-black">
              {poster.name ||
                poster.title ||
                poster.original_title ||
                poster.original_name}
            </h2>
          </div>
          <div className="overView w-[65%]">
            <p className="leading-tight text-[1.2vw] opacity-60">
              {poster.overview.slice(0, 200)}
              <Link
                to={`${poster.media_type || poster.title}/details/${poster.id}`}
                className="text-[1.1vw] font-bold text-blue-500"
              >
                ..more
              </Link>
            </p>
          </div>
          <div className="rate flex gap-[1vw]">
            {poster.release_date && (
              <p>
                <i className="text-yellow-500 text-[1.3vw] ri-megaphone-fill">
                </i>
               <span className="text-[1.2vw]"> 
                {" "} Release Date:{" "}{new Date(poster.release_date).toLocaleDateString()}
               </span>
              </p>
            )}
            <p>
              <i className="text-yellow-500 text-[1.3vw] ri-thumb-up-fill"></i>{" "}
             <span className="text-[1.2vw]"> 
              {" "} Rating: {poster.vote_average}
             </span>
            </p>
          </div>
          <div className="btnPopularity flex items-center gap-[1vw]">
            <p>
              <i className="text-yellow-500 text-[1.3vw] ri-star-fill"></i>
             <span className="text-[1.2vw]"> 
              {" "} Popularity: {poster.popularity}
             </span>
            </p>
            {info.video && (
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-white/25   hover:bg-black/40 transition-all 2s ease-linear text-[1.2vw] flex w-fit rounded p-[.5vw]"
              >
                Watch Trailer
              </button>
            )}
          </div>
        </div>
        {isPlaying && (
          <div
            onMouseOver={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
            className="trailer absolute overflow-hidden bottom-0 left-0 w-full min-h-[100%] bg-slate-600"
          >
            <iframe
              id="ytplayer"
              type="text/html"
              width="100%"
              height="100%"
              className="absolute scale-[157%] right-0 top-0 object-cover"
              src={`https://www.youtube.com/embed/${info.video.key}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
            />
            {pause && (
              <div
                onClick={() => setIsPlaying(false)}
                className="cursor-pointer pauseBtn absolute bottom-[3vw] left-[.2vw] h-[1vw]"
              >
                <i className="h-[100%] text-[3vw] ri-pause-circle-fill"></i>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  ) : (
    <HeaderLoading />
  );
};

export default Header;
