import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { removetv } from '../store/reducers/tvSlice'
import Loading from './Loading'
import Horizontalcard from './partials/Horizontalcard'
import { asyncloadtv } from '../store/actions/tvactions'
import noimage from "/noimage.png"

const Tvdetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const tv = useSelector((state) => state.tv.tvdata)

  useEffect(() => {
    dispatch(asyncloadtv(id))
    return () => dispatch(removetv())
  }, [id])

  return tv ? (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-y-auto px-4 md:px-10 py-5 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${tv?.detail.backdrop_path})`
      }}
    >
      {/* Nav */}
      <nav className="flex flex-wrap items-center gap-4 text-sm md:text-xl mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-[#6556cd]">
          <i className="text-lg md:text-2xl ri-arrow-left-line"></i>
          <span>Trending</span>
        </button>
        <a title="Webpage" target="_blank" href={tv.detail.homepage}><i className="ri-external-link-line"></i></a>
        <a title="Wikipedia" target="_blank" href={`https://www.wikidata.org/wiki/${tv.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
        <a title="IMDB" target="_blank" href={`https://www.imdb.com/title/${tv.detail.imdb_id}/`}>IMDB</a>
      </nav>

      {/* Poster & Details */}
      <div className="flex flex-col lg:flex-row gap-8 items-start mb-6">
        <img
          className="w-full lg:w-auto max-w-[300px] h-auto object-cover shadow-lg rounded"
          src={`https://image.tmdb.org/t/p/original${tv.detail.poster_path || tv.detail.backdrop_path}`}
          alt="poster"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            {tv.detail.name || tv.detail.title || tv.detail.original_name}
            <small className="ml-2 text-lg text-zinc-300">({tv.detail.first_air_date?.split('-')[0]})</small>
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
            <i className="ri-star-fill text-amber-500 text-xl"></i>
            <span className="font-semibold text-lg">{tv.detail.vote_average.toFixed(1)}</span>
            <span>User Score</span>
            <span>{tv.detail.first_air_date}</span>
            <span>{tv.detail.genres.map(g => g.name).join(', ')}</span>
            <span>{tv.detail.episode_run_time?.[0] || tv.detail.runtime} min</span>
          </div>

          <p className="italic text-lg text-zinc-300">{tv.detail.tagline}</p>
          <h2 className="font-semibold text-xl">Overview:</h2>
          <p className="text-zinc-300">{tv.detail.overview}</p>

          <h2 className="font-semibold text-xl">Translated:</h2>
          <p className="text-zinc-300">{tv.translations.join(', ')}</p>

          <Link
            to={`${pathname}/trailer`}
            className="inline-block px-6 py-3 text-lg font-medium rounded bg-[#6556cd] hover:bg-[#4e46b5] transition duration-300"
          >
            <i className="ri-play-fill mr-2"></i> Watch Trailer
          </Link>
        </div>
      </div>

      {/* Providers */}
      <div className="space-y-5">
        {['flatrate', 'rent', 'buy'].map(type => (
          tv.watchproviders?.[type] && (
            <div key={type} className="flex flex-wrap items-center gap-3">
              <h4 className="text-lg font-semibold capitalize">Available on {type}</h4>
              <div className="flex gap-2 flex-wrap">
                {tv.watchproviders[type].map((w, i) => (
                  <img
                    key={i}
                    title={w.provider_name}
                    src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                    className="w-10 h-10 rounded object-contain hover:scale-110 transition"
                    alt="provider"
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Seasons */}
      <hr className="mt-10 border-zinc-600" />
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-200 my-5">Seasons</h1>
      <div className="flex overflow-x-auto gap-6 px-1 md:px-5 pb-5 scrollbar-thin scrollbar-thumb-[#6556cd]/60">
        {(tv.detail.seasons.length > 0 ? tv.detail.seasons : tv.similar).map((season, index) => (
          <div
            key={index}
            className="min-w-[160px] max-w-[180px] flex-shrink-0 text-center transition-all hover:scale-105 hover:shadow-xl bg-[#1f1f1f] rounded-lg"
          >
            <img
              src={season.poster_path ? `https://image.tmdb.org/t/p/w300${season.poster_path}` : noimage}
              alt={season.name}
              className="rounded-t-lg w-full h-[230px] object-cover"
            />
            <p className="mt-2 px-2 pb-3 text-zinc-200 text-sm font-medium truncate">{season.name}</p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <hr className="mt-10 border-zinc-600" />
      <h1 className="text-2xl md:text-3xl p-5 font-bold text-zinc-200">Recommendations & Similar</h1>
      <Horizontalcard data={tv.recommendations.length > 0 ? tv.recommendations : tv.similar} />

      <Outlet />
    </div>
  ) : <Loading />
}

export default Tvdetails
