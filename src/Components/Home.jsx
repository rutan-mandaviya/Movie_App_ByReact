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
  const [trending, settrending] = useState(null)
  const [category, setcategory] = useState("all")

  const GetWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
  
      const res = data.results[Math.floor(Math.random() * data.results.length)];
      setwallpaper(res);
    } catch (error) {
      console.log(error);
    }
  };




  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
     
    
      settrending(data.results)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   !wallpaper && GetWallpaper();
   GetTrending()
  }, [category]);



  return wallpaper && trending  ? (
    <>
      <Sidenav></Sidenav>
      <div className="w-[80%] h-full overflow-auto overflow-x-auto">
        <Topnav></Topnav>
        <Header data={wallpaper}></Header>
          <div className="w-full   p-5 ">

        
        <div className="w-full flex justify-between ">
        <h1 className="w-2/3 text-2xl text-zinc-300 font-semibold">Trending </h1>
        
        <Dropdown title="Filter"  options={["tv","movie","all"]}  func={(e)=>{setcategory(e.target.value)}}></Dropdown>
      </div>
          </div>

        <Horizontalcard data={trending}></Horizontalcard>
      </div>
    </>
  ) : (
 <Loading/>
  );
};

export default Home;
