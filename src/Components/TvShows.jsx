/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import DropDown from "./DropDown";
import axios from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";
import SideNav from "./SideNav";
const TvShows = () => {
  const navigate = useNavigate();
  const [tvShows, setTvShows] = useState([]);
  const [filter, setFilter] = useState("top_rated");
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getResults = async () => {
    try {
      const { data } = await axios.get(`/tv/${filter}?page=${page}`);
      if (data.results.length > 0) {
        setTvShows((prev) => [...prev, ...data.results]);
        setPage(page + 1); // assuming 20 results per page. Adjust as needed.
      } else {
        sethasMore(false);
      }

      console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTvShows([]);
    sethasMore(true);
  };
  useEffect(() => {
    refreshHandler();
  }, [filter]);

  useEffect(() => {
    getResults();
  }, [page]);
  return (
    <div className="main w-full h-[100%] flex">
    <SideNav />
    <div className="w-[83%] min-h-screen bg-[#1E293B] overflow-y-auto">
      <div className="contentPart w-full flex flex-col gap-[1vw]">
        <div className="trendingBar px-4 flex justify-between items-center ">
          <div className="leftPart flex items-center gap-[6vw]">
            <span className=" bg-slate-200 w-full  h-fit">
              <SearchBar />
            </span>
          </div>
          <div className="dropDown flex gap-[1.4vw] ">
            <DropDown
              title={"filter"}
              func={(e) => setFilter(e.target.value)}
              options={["Airing_Today", "On_The_Air", "top_Rated"]}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={tvShows.length}
          next={getResults}
          hasMore={hasMore}
        >
          <div className="trendingSection px-[.5vw] justify-center overflow-x-hidden flex flex-wrap gap-[1vw]">
            {tvShows &&
              tvShows.map((item, idx) => (  
                <Cards val={item} title={'tv'} key={idx} idx={idx} />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  </div>
  );
};

export default TvShows;
