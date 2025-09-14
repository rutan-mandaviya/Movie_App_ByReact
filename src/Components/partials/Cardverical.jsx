import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "/noimage.png"

const Cardverical = ({ data, title }) => {
  return (
    <div className="w-[90%] mx-auto flex flex-wrap justify-between gap-3 ">
      {data.map((items, index) => (
        <Link
          to={`/${items.mediatype || title}/details/${items.id}`}
          className="w-[46%] sm:w-[30%] md:w-[23%] lg:w-[18%] xl:w-[18%] mb-6 hover:scale-[1.05] transition-transform duration-300"
          key={index}
        >
          <img
            className="w-full h-[35vh]  sm:h-[40vh] md:h-[50vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={
              items.poster_path || items.backdrop_path || items.profile_path
                ? `https://image.tmdb.org/t/p/w500/${items.poster_path || items.backdrop_path || items.profile_path}`
                : noimage
            }
            alt=""
          />

          <h1 className="text-sm sm:text-base md:text-lg font-medium text-zinc-300 mt-3 line-clamp-2">
            {items.name ||
              items.title ||
              items.original_name ||
              items.original_title}
          </h1>

          {items.vote_average && (
            <div className="flex items-center gap-1 text-sm sm:text-base text-white mt-1">
              <i className="text-amber-500 ri-star-fill"></i>
              <h1>{items.vote_average.toFixed(1)}</h1>
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}

export default Cardverical
