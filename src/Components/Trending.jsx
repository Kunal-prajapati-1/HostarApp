/* eslint-disable no-unused-vars */
import axios from "../Utils/Axios";
import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import TrendingLoading from "./partials/TrendingLoading";
const Trending = () => {
  const [trending, setTrending] = useState(null);
  const [duration, setduration] = useState("day");
  const [filter, setFilter] = useState("all");
  const getResults = async () => {
    try {
      const { data } = await axios.get(`/trending/${filter}/${duration}`);
      setTrending(data.results);
      // console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getResults();
  }, [filter, duration]);
  return (
    <>
     <div className="contentPart w-full h-[30%] flex flex-col bg-gray-900 pt-[.5vw] gap-[.7vw]">
        <div className="trendingBar px-[.3vw] flex items-end justify-between">
          <h2 className="text-[1.1vw] text-zinc-400 font-semibold cursor-pointer uppercase">
            Trending
          </h2>
          <div className="dropDown flex gap-[1.4vw]">
            <DropDown
              title={"filter"}
              func={(e) => setFilter(e.target.value)}
              options={["all", "movie", "tv"]}
            />
            <DropDown
              title={"duration"}
              func={(e) => setduration(e.target.value)}
              options={["all", "week", "day"]}
            />
          </div>
        </div>
        <div className="trendingSection w-[100%] h-[100%] flex gap-[1vw] overflow-x-auto overflow-y-hidden">
          {trending ?
            trending.map((item, idx) => (
              <Link
                to={`${item.media_type || filter}/details/${item.id}`}
                key={idx}
                className=" content min-w-[20%]  h-[100%] "
              >
                <div className="img-container h-[85%] overflow-hidden">
                <img
                  style={{
                    transition: "transform 0.6s",
                    transitionDelay: "0.2s",
                  }}
                  className="h-full w-full  hover:scale-[115%] hover:shadow-2xl shadow-black transition-all duration-600 ease-in-out object-cover object-center  z-20"
                  src={`https://image.tmdb.org/t/p/original/${
                    item.backdrop_path || item.profile_path
                  })`}
                  alt=""
                />
                </div>
                <div className="description">
                  <h2 className="text-[1.1vw] text-zinc-100 font-semibold">
                    {item.name ||
                      item.title ||
                      item.original_title ||
                      item.original_name}
                  </h2>
                </div>
              </Link>
            )) : <TrendingLoading/>
          }
        </div>
      </div>
    </>
  );
};

export default Trending;
