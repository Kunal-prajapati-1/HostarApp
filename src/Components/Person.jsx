/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";
const Peoples = () => {
  const navigate = useNavigate();
  const [peoples, setPeoples] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getResults = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setPeoples((prev) => [...prev, ...data.results]);
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
    if (peoples.length === 0) {
      getResults();
    } else {
      setPage(1);
      setPeoples([]);
      getResults();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, []);
  return (
    peoples.length > 0 && (
      <div className="relative w-full min-h-screen bg-[#1E293B] pt-1 ">
        <span className="absolute left-[10%] w-[60%] h-[5vw]">
          <SearchBar />
        </span>
        <div className="contentPart w-full flex flex-col mt-4 gap-[1vw]">
          <div className="popularBar mt-[1vw] px-4 flex justify-between">
            <div className="peoples flex gap-2 items-center">
              <i
                onClick={() => navigate(-1)}
                className="text-[1.3vw] text-slate-400 cursor-pointer ri-arrow-left-line"
              ></i>
              <h2 className="text-[1.3vw]  text-zinc-400 font-semibold cursor-pointer uppercase">
                People
              </h2>
            </div>
          </div>
          <InfiniteScroll
            dataLength={peoples.length}
            next={getResults}
            hasMore={hasMore}
          >
            <div className="trendingSection px-[.5vw] justify-center overflow-x-hidden flex flex-wrap gap-5">
              {peoples &&
                peoples.map((item, idx) => (
                  <Cards
                    link="true"
                    width="17vw"
                    height="25vw"
                    imgH="93%"
                    val={item}
                    key={idx}
                    idx={idx}
                  />
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    )
  );
};

export default Peoples;
