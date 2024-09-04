/* eslint-disable no-unused-vars */
import Header from "./Header";
import Trending from "./Trending";
import SearchBar from "./SearchBar";

const HomeContent = () => {
  
    return (
        <div className="content w-[83%] min-h-screen overflow-y-auto bg-slate-900">
            <SearchBar/>
            <Header/>   
            <Trending/>
        </div>
    );
};

export default HomeContent;
