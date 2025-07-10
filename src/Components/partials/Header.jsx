import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  return (
    <div
      className="w-full h-[70vh] rounded-xl bg-cover bg-center relative overflow-hidden flex flex-col items-start justify-end px-[5%] py-[4%] text-white"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(24, 23, 27, 0.9), rgba(24, 23, 27, 0.3)), url(https://image.tmdb.org/t/p/original/${data?.backdrop_path || data?.profile_path})`
      }}
    >
      <h1 className="text-6xl font-bold tracking-tight leading-snug drop-shadow-md">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="text-lg mt-4 mb-4 max-w-[60%] text-zinc-300">
        {data.overview?.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-[#48a0f7] hover:underline ml-1"
        >
          more
        </Link>
      </p>
      <div className="flex items-center gap-6 text-sm text-zinc-400">
        <span className="flex items-center gap-2">
          <i className="ri-megaphone-fill text-yellow-400"></i>
          {data.first_air_date || 'No Info'}
        </span>
        <span className="flex items-center gap-2">
          <i className="ri-album-fill text-yellow-400"></i>
          {data.media_type?.toUpperCase() || 'UNKNOWN'}
        </span>
      </div>
      <Link  to={`/${data.media_type}/details/${data.id}/trailer`}
        className="mt-6 px-6 py-2 bg-[#6556cd] hover:bg-[#4d41a6] text-white font-semibold text-lg rounded-lg shadow-md transition duration-300"
      >
        <i className="ri-play-fill mr-2"></i> Watch Trailer
      </Link>
    </div>
  );
};

export default Header;