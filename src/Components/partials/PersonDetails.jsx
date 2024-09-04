/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import asyncPersonLoad, {
  removePerson,
} from "../../store/actions/PersonActions";
import LoadingScene from "./LoadingScene";
const PersonDetails = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  console.log(info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPersonLoad(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id, dispatch]);

  return info ? (
    <div className="h-screen w-full bg-[#111] pt-1 main">
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
      <div className="mainContent flex flex-col gap-[1vw]  w-[100%] h-[92%] ">
        <div className="part1 flex gap-[1vw] w-[100%] h-[50%] px-[2vw] ">
          <div className="poster relative overflow-hidden ">
            <img
              className="h-full w-fit object-contain  "
              src={`https://image.tmdb.org/t/p/original/${
                info.detail.backdrop_path ||
                info.detail.profile_path ||
                info.detail.poster_path
              }`}
              alt=""
            />
          </div>

          <div className="details h-full w-[70%] overflow-hidden">
            <h2 className="text-[2vw] font-black">
              {info.detail.title ||
                info.detail.name ||
                info.detail.original_name ||
                info.detail.original_title}
            </h2>
            <div className="rate flex flex-col gap-[.1em]">
              <p>Birth Date: {info.detail.birthday}</p>
              <p>Place of Birth: {info.detail.place_of_birth}</p>
              <p>
                Known As:{" "}
                {info.detail.also_known_as.map((item, id) => {
                  if (id === info.detail.also_known_as.length - 1) {
                    return <span key={id}>{item} </span>;
                  }
                  return (
                    <span key={id}>
                      {item}
                      {" , "}
                    </span>
                  );
                })}
              </p>
              <p>known For : {info.detail.known_for_department}</p>
            </div>

            <div className="btnPopularity gap-[1vw]">
              <p>
                <i className="text-yellow-500 ri-star-fill"></i> Popularity:
                {info.detail.popularity}
              </p>
            </div>
            <div className="biography h-[40%] mt-4 overflow-y-auto">
              <p>
                Biography :{" "}
                {show
                  ? info.detail.biography
                  : info.detail.biography.slice(0, 200)}
                <button
                  onClick={() => setshow(true)}
                  className="text-purple-500"
                >
                  ...more
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="recommended h-[50%] mt-1 w-full px-[2vw]">
          <div className="contentPart w-full h-[15%] flex items-center gap-[.7vw]">
            <h2 className="text-[1.2vw] text-zinc-300 font-semibold cursor-pointer uppercase">
              Recommend
            </h2>
          </div>
          <div className="trendingSection w-[100%] h-[85%] flex gap-[1vw] overflow-x-auto overflow-y-hidden">
            {(info.combined_credits 
              ? info.combined_credits.cast
              : info.combined_credits.crew
            ).map((item, idx) => (
              <Link
                to={`/movie/details/${item.id}`}
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
  ) : (
    <LoadingScene />
  );
};

export default PersonDetails;
