/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import axios from "../Utils/Axios";
import React, { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [flag, setFlag] = useState(false);
  const [search, setsearch] = useState([]);
  const searchContainerRef = useRef(null);
  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearch(data.results);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Function to handle clicks outside the search container
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setFlag(false);
      }
    };
    getSearch();
    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [query]);

  return (
    <div
      ref={searchContainerRef}
      className="searchContainer select-none bg-slate-900 relative h-[3vw] w-[40vw] ml-[0%]"
    >
      <div
        onClick={() => setFlag(true)}
        className="searchBar flex items-center relative h-[100%] w-[100%]"
      >
        <i className="absolute left-[2%] cursor-pointer z-10 text-[1.4vw] text-zinc-400 ri-search-line"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="search"
          name="search"
          id="search"
          placeholder="find shows"
          className="h-full w-full text-[1.3vw] outline-none px-[3.7vw] font-bold  bg-transparent cursor-pointer"
        />
        {query && (
          <i
            onClick={() => setQuery("")}
            className="absolute cursor-pointer right-[4%] z-10 text-[1.6vw] text-zinc-300 ri-close-line"
          ></i>
        )}
      </div>

      {flag && (
        <div className="searchContent max-h-[25vw] overflow-y-auto w-[37vw] z-10 rounded-md bg-zinc-900 absolute left-[8%] mt-[1vw]">
          {search &&
            search.map(
              (s, i) =>
                (s.profile_path || s.backdrop_path) && (
                  <Link to={`/${s.media_type || s.title}/details/${s.id}`}
                    key={i}
                    className="flex gap-4 justify-start h-[5vw] bg-gray-900  px-4 py-1"
                  >
                    <img
                      className="h-[100%] shadow-lg object-center rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`}
                      alt=""
                    />
                    <h2 className="self-center text-slate-300 leading-none text-[1.3vw]">
                      {s.name || s.title || s.original_title || s.original_name}
                    </h2>
                  </Link>
                )
            )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
