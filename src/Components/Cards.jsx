/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Cards = ({
  link = "true",
  width = "19vw",
  height = "14vw",
  imgH = "80%",
  val,
  idx,
  title,
}) => {
  const url =
    val.backdrop_path || val.profile_path || val.poster_path
      ? `https://image.tmdb.org/t/p/original/${
          val.backdrop_path || val.profile_path || val.poster_path
        }`
      : "https://media.assettype.com/freepressjournal/2023-08/b5720cc7-d4fa-4c6a-a970-05ebe4a81a25/Disney_Hotstar.jpg";
  // console.log(title)
  // console.log(val.media_type)
  return (
    <Link
      to={link == "true" ? `/${title || val.media_type || 'person'}/details/${val.id}` : ``}
      
      key={idx}
      style={{ width, height }}
      className="content ml-[.4vw] mb-[.4vw] rounded-sm select-none overflow-hidden "
      >
      {console.log(val)}
      <div
        style={{ height: imgH, transition: "transform 0.4s ease-in-out" }}
        className="image overflow-hidden relative"
      >
        <img
          style={{
            transition: "transform 0.4s ease-in-out",
          }}
          className=" absolute h-[100%] w-[100%] hover:scale-[110%] hover:shadow-2xl shadow-white/80   object-cover object-center"
          src={url}
          alt=""
        />
      </div>
      <div style={{ height: "calc(100% - imgH)" }} className="description">
        <h2 className="text-[1vw] text-slate-500 font-semibold">
          {val.name || val.title || val.original_title || val.original_name}
        </h2>
      </div>
    </Link>
  );
};

export default Cards;
