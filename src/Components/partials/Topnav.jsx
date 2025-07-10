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
    if (query.trim()) {
      GetSearches();
    } else {
      setsearch([]);
    }
  }, [query]);

  return (
    <div className="w-full relative flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start px-4 sm:px-8 py-2 gap-2 sm:gap-4">
      <div className="flex items-center w-full sm:w-[80%] bg-transparent border-b border-gray-600">
        <i className="text-zinc-400 text-xl sm:text-2xl ri-search-line ml-2"></i>
        <input
          value={query}
          onChange={(e) => setquery(e.target.value)}
          className="text-zinc-200 text-xl outline-none w-full px-4 py-4 bg-transparent"
          type="text"
          placeholder="Search anything"
        />
        {query.length > 0 && (
          <i
            onClick={() => setquery("")}
            className="text-zinc-400 text-xl sm:text-2xl ri-close-line mr-2 cursor-pointer"
          ></i>
        )}
      </div>

      {/* Dropdown */}
      {query.length > 0 && search.length > 0 && (
        <div className="absolute top-full mt-2 w-full sm:w-[80%] max-h-[50vh] bg-black rounded-md text-zinc-50 font-semibold overflow-auto shadow-lg z-50">
          {search.map((data, i) => (
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              key={i}
              className="w-full flex items-center gap-4 p-3 sm:p-4 border-b border-zinc-700 hover:bg-zinc-800 transition"
            >
              <img
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-md object-cover shadow-md"
                src={
                  data.backdrop_path || data.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${
                        data.backdrop_path || data.profile_path
                      }`
                    : noimage
                }
                alt={data.name || data.title}
              />
              <h1 className="text-sm sm:text-base">
                {data.name ||
                  data.original_title ||
                  data.original_name ||
                  data.title}
              </h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
