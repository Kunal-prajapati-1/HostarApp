/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import asyncTvLoad, { removeTv } from "../../store/actions/TvActions";
import LoadingScene from "./LoadingScene";

const TvShowsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const pauseBtn = useRef();

  useEffect(() => {
    dispatch(asyncTvLoad(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (isPlaying) {
      const handleMouseMove = (e) => {
        if (pauseBtn.current) {
          pauseBtn.current.style.top = `${e.clientY}px`;
          pauseBtn.current.style.left = `${e.clientX}px`;
        }
      };
      document
        .querySelector(".main")
        .addEventListener("mousemove", handleMouseMove);
      return () => {
        document
          .querySelector(".main")
          .removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isPlaying]);

  return info ? (
    <>
      <div className="main h-screen w-full bg-[#111] pt-1">
        {isPlaying && (
          <div
            ref={pauseBtn}
            onClick={() => setIsPlaying(false)}
            id="pause"
            className="pause cursor-pointer left-10 top-10 -translate-x-[50%] -translate-y-[50%] w-fit fixed rounded-full z-[999] pointer-events-none"
          >
            <i className="h-[100%] text-[3vw] ri-pause-circle-fill"></i>
          </div>
        )}
        {/* part_1 nav done */}
        <nav className="h-[5%] w-full flex gap-[1vw] items-center px-[2vw] my-[.2vw]">
          <Link
            onClick={() => navigate(-1)}
            className="text-[1.3vw] text-slate-400 cursor-pointer ri-arrow-left-line"
          ></Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={info.detail.homepage}
          >
            <i className="ri-external-link-fill text-[1.1vw]"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
          >
            <i className="ri-earth-fill text-[1.1vw]"></i>
          </a>
          <a
            className="text-[1.1vw]"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
          >
            imdb
          </a>
        </nav>

        {/* part_2 poster & details */}
        <div className="mainContent flex flex-col gap-[1vw] w-[100%] mt-[0vw] h-[92%] mx-auto">
          <div className="part1 flex gap-[2vw] w-[95%] mt-[1vw] h-[55%] mx-[2vw]">
            <div className="poster relative h-fit w-[27vw] overflow-hidden">
              <img
                className="h-full w-full object-contain"
                src={`https://image.tmdb.org/t/p/original/${
                  info.detail.backdrop_path ||
                  info.detail.profile_path ||
                  info.detail.poster_path
                }`}
                alt=""
              />
            </div>

            <div className="details overflow-hidden relative h-[100%] w-[70%]">
              <h2 className="text-[2vw] font-black">
                {info.detail.title ||
                  info.detail.name ||
                  info.detail.original_name ||
                  info.detail.original_title}
              </h2>
              <div className="overView w-[65%]">
                <div className="rate flex gap-[2vw]">
                  {info.detail.release_date && (
                    <p>
                      <i className="text-yellow-500 text-[1.2vw] ri-megaphone-fill"></i>{" "}
                      Release Date:{" "}
                      {new Date(info.detail.release_date).toLocaleDateString()}
                    </p>
                  )}
                  <p>
                    <i className="text-yellow-500 ri-thumb-up-fill"></i> Rating:
                    {info.detail.vote_average}
                  </p>
                </div>
                <div className="overview overflow-y-auto h-[12vw] mb-[1vw]">
                  <p className="leading-tight text-[1.2vw] mt-[1vw]">
                    {info.detail.overview ? (
                      info.detail.overview
                    ) : (
                      <div className="flex flex-col gap-[.3vw]">
                        <span className="text-[1.4vw] text-gray-500">
                          First air date :
                          <span className="text-gray-400 text-[1.2vw]">
                            {" "}
                            {info.detail.first_air_date}
                          </span>
                        </span>
                        {info?.detail.next_episode_to_air?.name && 
                        <span className="text-[1.4vw] text-gray-500">
                          Episode name:
                          <span className="text-gray-400 text-[1.2vw]">
                            {" "}
                            {info?.detail.next_episode_to_air?.name}
                          </span>
                        </span>}
                        {info?.detail.next_episode_to_air?.season_number && (
                          <span className="text-[1.4vw] text-gray-500">
                            Next episode to air:
                            <span className="text-gray-400 text-[1.2vw]">
                              {" "}
                              {info?.detail.next_episode_to_air?.season_number}
                            </span>
                          </span>
                        )}
                        <span className="text-[1.4vw] text-gray-500">
                          Number of episodes:
                          <span className="text-gray-400 text-[1.2vw]">
                            {" "}
                            {info.detail.number_of_episodes}
                          </span>
                        </span>
                      </div>
                    )}
                  </p>
                </div>
              </div>
              <div className="btnPopularity flex items-center gap-[1vw]">
                <p>
                  <i className="text-yellow-500 ri-star-fill"></i> Popularity:
                  {info.detail.popularity}
                </p>
                {info.video && (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="bg-blue-700 flex w-fit rounded p-[.7vw]"
                  >
                    Watch Trailer
                  </button>
                )}
                {isPlaying && (
                  <div className="video absolute top-0 right-0 h-[30vw] w-full z-10">
                    <iframe
                      id="ytplayer"
                      type="text/html"
                      width="100%"
                      height="100%"
                      className="absolute scale-[150%] object-cover"
                      src={`https://www.youtube.com/embed/${info.video.key}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="recommended h-[37%] mt-1 w-full px-[2vw]">
            <div className="contentPart w-full h-[15%] flex items-center gap-[.7vw]">
              <h2 className="text-[1.2vw] text-zinc-300 font-semibold cursor-pointer uppercase">
                Recommend
              </h2>
            </div>
            <div className="trendingSection w-[100%] h-[85%] flex gap-[1vw] overflow-x-auto overflow-y-hidden">
              {(info.recommendations.length > 0
                ? info.recommendations
                : info.similar
              ).map((item, idx) => (
                <Link
                  to={`/tv/details/${item.id}`}
                  key={idx}
                  className="content min-w-[20%] h-[100%]"
                >
                  <div className="imgContainer h-[85%] overflow-hidden">
                    <img
                      style={{
                        transition: "transform 0.6s ",
                        transitionDelay: "0.2s",
                      }}
                      className="h-full w-full hover:scale-[112%] hover:shadow-2xl shadow-black transition-all duration-600 ease-in-out object-cover object-center hover:z-40"
                      src={
                        item.backdrop_path ||
                        item.profile_path ||
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/original/${
                              item.backdrop_path ||
                              item.profile_path ||
                              item.poster_path
                            }`
                          : "https://media.assettype.com/freepressjournal/2023-08/b5720cc7-d4fa-4c6a-a970-05ebe4a81a25/Disney_Hotstar.jpg"
                      }
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <LoadingScene />
  );
};

export default TvShowsDetails;
