import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
// import noimage from './noimage.png'
import noimage from "/noimage.png"
const Horizontalcard = ({ data }) => {

  return (
    <div className="w-full h-[45vh]  ">
      <div className="w-full full    overflow-x-auto overflow-y-hidden flex gap-5 scrollbar-hide">
        {data.map((items, id) => (
          <Link to={`/${items.media_type}/details/${items.id}`}
            key={id}
            className="min-w-[240px]  bg-gradient-to-b from-[#1c1c1c] to-[#121212] rounded-md shadow-lg shadow-black/50 backdrop-blur-md border border-white/10 hover:scale-[1.05] transition-transform duration-300"
          >
            <img
              className=" w-full h-[170px] rounded-t-lg object-cover"
              src={ items.backdrop_path || items.profile_path || items.poster_path ? `https://image.tmdb.org/t/p/original/${
                items.backdrop_path || items.profile_path || items.poster_path
              }`:noimage}
              alt=""
            />
            <div className="p-4 text-white">
              <h1 className="text-lg font-bold truncate">
                {items.name ||
                  items.title ||
                  items.original_name ||
                  items.original_title }
              </h1>
              <p className="text-sm mt-2 text-zinc-400 ">
                {items.overview?.slice(0, 100)}...
                <span className="text-blue-500 cursor-pointer"> more</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Horizontalcard;
