import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import Horizontalcard from "./partials/Horizontalcard";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "SSDB | HOME";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      const res = data.results[Math.floor(Math.random() * data.results.length)];
      setwallpaper(res);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !wallpaper && GetWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex flex-col md:flex-row bg-black text-white min-h-screen overflow-x-hidden relative pb-[70px] md:pb-0">
      {/* Sidebar for Desktop / BottomNav for Mobile */}
      <Sidenav />

      {/* Main Content */}
      <div className="flex-1 w-full md:w-[78%] h-full overflow-auto">
        {/* Topnav on all screens */}
        <div className="px-4 py-3">
          <Topnav />
        </div>

        {/* Banner/Header */}
        <Header data={wallpaper} />

        {/* Trending + Dropdown */}
        <div className="w-full px-4 py-4">
          <div className="flex  sm:flex-row justify-between items-center sm:items-center bg-zinc-800 px-4 py-3 rounded-md mb-5">
            <h1 className="text-xl sm:text-2xl font-semibold text-zinc-100 mb-2 sm:mb-0">
              Trending
            </h1>
            <Dropdown
              title="Filter"
              options={["tv", "movie", "all"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          {/* Horizontal Card List */}
          <Horizontalcard data={trending} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
