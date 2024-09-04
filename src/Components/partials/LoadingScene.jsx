import { Link, Navigate } from "react-router-dom";
let array1 = Array.from({ length: 20 });
// console.log(array1);
const LoadingScene = () => {
  return (
    <div className="h-screen w-full bg-[#111]">
      {/* part_1 nav done */}
      <nav className="h-[5%] w-full flex gap-[1vw] items-center px-[2vw] ">
        <Link
          onClick={() => Navigate(-1)}
          className="text-[1.3vw] text-slate-300 cursor-pointer ri-arrow-left-line"
        ></Link>
        <i className="ri-external-link-fill text-slate-400"></i>

        <i className="ri-earth-fill text-slate-400"></i>
        <a className="text-slate-400" target="_blank">imdb</a>
      </nav>

      {/* part_2 poster & details */}
      <div className="mainContent flex flex-col gap-[1vw] w-[100%] mt-[1vw] h-[92%] mx-auto ">
        <div className="part1  flex gap-[2vw] w-[85%] mt-[1vw] h-[55%] mx-auto">
          <div className="poster  bg-slate-500  relative h-[85%] w-[25%]">
            <img className="h-full w-fullobject-cover object-center" alt="" />
          </div>
          <div className="details overflow-hidden relative h-[100%] w-[70%]">
            <span className=" flex h-[3vw] w-[10vw] bg-slate-600"></span>
            <div className="overView w-[65%]">
              {/* <div className="rate flex gap-[2vw]">
                  <p>
                    <i className="text-yellow-500 text-[1.2vw] ri-megaphone-fill"></i>{" "}
                    Release Date:{" "}
                  </p>
                <p>
                  <i className="text-yellow-500 ri-thumb-up-fill"></i> Rating:
                </p>
              </div> */}
              <div className="overview flex flex-col overflow-y-auto h-[12vw] mb-[1vw]">
                <span className=" flex mt-[1vw] h-[1.8vw] w-[30vw] bg-slate-600"></span>
                <span className=" flex mt-[1vw] h-[1.8vw] w-[30vw] bg-slate-600"></span>
                <span className=" flex mt-[1vw] h-[1.8vw] w-[30vw] bg-slate-600"></span>
                <span className=" flex mt-[1vw] h-[1.8vw] w-[30vw] bg-slate-600"></span>
              </div>
            </div>
            <div className="btnPopularity flex items-center gap-[1vw]">
              <button className="bg-gray-500 flex w-[7vw] h-[3.4vw] rounded p-[.7vw]"></button>
            </div>
          </div>
        </div>
        <div className="recommended h-[37%] mt-1 w-full px-[2vw]">
          <div className="contentPart w-full h-[15%] flex items-center gap-[.7vw]">
            <h2 className="text-slate-300 text-[1.2vw] font-semibold cursor-pointer uppercase">
              Recommend
            </h2>
          </div>
          <div className="trendingSection w-[100%] h-[85%] flex gap-[1vw] overflow-x-auto overflow-y-hidden">
            {array1.map((item, idx) => (
              <div key={idx+1} className="content min-w-[20%] h-[100%]">
                <div
                  style={{
                    transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                    transitionDelay: "0.2s",
                  }}
                  className="h-[85%] w-full hover:scale-[120%] hover:shadow-2xl bg-gray-500 transition-all duration-600 ease-in-out object-cover object-center hover:z-40"
                ></div>

                <div className="description">
                  <span className="text-[1.1vw] text-zinc-100 font-semibold"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScene;
