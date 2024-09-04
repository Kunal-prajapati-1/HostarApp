/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import DropDown from "./DropDown";
import axios from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";
import SideNav from "./SideNav";

const TrendingPage = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [duration, setDuration] = useState("day");
  const [filter, setFilter] = useState("movie");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getResults = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${filter}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage(page + 1); // assuming 20 results per page. Adjust as needed.
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTrending([]);
    setHasMore(true);
  };

  useEffect(() => {
    refreshHandler();
  }, [filter, duration]);

  useEffect(() => {
    getResults();
  }, [page]);

  return (
    <div className="main w-full h-[100%] flex">
      <SideNav />
      <div className="w-[83%] min-h-screen bg-slate-900 overflow-y-auto">
        <div className="contentPart w-[100%] flex flex-col gap-[1vw]">
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
                options={["movie", "tv"]}
              />
              <DropDown
                title={"duration"}
                func={(e) => setDuration(e.target.value)}
                options={["week", "day"]}
              />
            </div>
          </div>
          <InfiniteScroll
            dataLength={trending.length}
            next={getResults}
            hasMore={hasMore}
          >
            <div className="trendingSection px-[.5vw] justify-center overflow-x-hidden flex flex-wrap gap-[1vw]">
              {trending &&
                trending.map((item, idx) => (
                  <Cards val={item} title={filter} key={idx} idx={idx} />
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
