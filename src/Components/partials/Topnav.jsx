import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";
const Topnav = () => {
  const [query, setquery] = useState("");
  const [search, setsearch] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] z-10 relative flex justify-start items-center px-[20%]">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        value={query}
        onChange={(e) => setquery(e.target.value)}
        className="text-zinc-200 outline-0 w-[70%] px-5 mx-5  bg-transparent p-5 border-b border-gray-600"
        type="text"
        placeholder="Search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 text-3xl ri-close-line"
        ></i>
      )}

      <div
        id="search"
        className=" absolute w-[50%] max-h-[50vh] bg-black  top-[100%] rounded-md mx-12  text-zinc-50 font-semibold overflow-auto"
      >
        {search.map((data, i) => {
          return (
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              key={i}
              className="w-full hover:bg-gray-800  border-b hover:text-white duration-.1  flex justify-start items-center p-5 gap-4  border-zinc-400"
            >
              <img
                className="w-20 h-20 rounded-md  shadow-2xl shadow-blue-400 object-cover  mr-5"
                src={
                  data.backdrop_path || data.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${
                        data.backdrop_path || data.profile_path
                      }`
                    : noimage
                }
                alt={data.name || data.title}
              />
              <h1>
                {data.name ||
                  data.original_title ||
                  data.original_name ||
                  data.title}
              </h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Topnav;
