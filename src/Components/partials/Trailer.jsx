import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";
const Trailer = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
 
  
//   const alldata=category="movie"?moviedata:tvdata
const movie = useSelector((state) =>
  category === "movie" ? state.movie.moviedata : state.tv.tvdata
);  // console.log(movie.videos.key,pathname);

  return  (
    <div className="absolute z-100 w-screen  flex justify-center items-center h-full top-0 left-0 bg-[rgba(0,0,0,0.7)]">
      <Link className=" absolute top-5 bg-red-500  rounded-full flex justify-center text-5xl font-semibold ">
        {" "}
        <i
          onClick={() => navigate(-1)}
          className="  hover:text-[#111] ri-close-line"
        ></i>
      </Link>

{movie?.videos ? <ReactPlayer
        width="80%"
        height="80%"
        controls
        src={`https://www.youtube.com/watch?v=${movie.videos.key}`}
      ></ReactPlayer>:<Notfound></Notfound>}
      


    </div>
  ) 
};

export default Trailer;
