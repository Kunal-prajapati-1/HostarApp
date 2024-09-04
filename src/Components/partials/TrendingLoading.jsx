let array1 = Array.from({ length: 20 });
function TrendingLoading() {

  return (
    <>
      {array1.map((item, idx) => (
        <div key={idx} className=" content min-w-[20%]  h-[100%] ">
          <div className="img-container h-[85%] overflow-hidden">
            <div
              style={{
                transition: "transform 0.6s",
                transitionDelay: "0.2s",
              }}
              className="h-full w-full bg-gray-700 hover:scale-[115%] hover:shadow-2xl shadow-black transition-all duration-600 ease-in-out object-cover object-center  z-20"
            ></div>
          </div>
          <div className="description">
          </div>
        </div>
      ))}
    </>
  );
}

export default TrendingLoading;
