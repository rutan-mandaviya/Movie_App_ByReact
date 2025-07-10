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
    return () => {
      dispatch(removetv())
    }
  }, [id])

  return tv ? (
    <div
      className='w-screen h-screen relative bg-cover overflow-y-auto bg-center bg-no-repeat px-10 py-5 text-white'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${tv?.detail.backdrop_path})`
      }}
    >
      {/* Navigation */}
      <nav className='h-[10vh] w-full flex items-center gap-10 text-xl'>
        <Link onClick={() => navigate(-1)} className='flex items-center gap-2 hover:text-[#6556cd]'>
          <i className="ri-arrow-left-line text-2xl"></i>
          Trending
        </Link>
        <a title='Webpage' target='_blank' rel='noreferrer' href={tv.detail.homepage}><i className="ri-external-link-line"></i></a>
        <a title='Wikipedia' target='_blank' rel='noreferrer' href={`https://www.wikidata.org/wiki/${tv.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
        <a title='IMDB' target='_blank' rel='noreferrer' href={`https://www.imdb.com/title/${tv.detail.imdb_id}/`}>IMDB</a>
      </nav>

      {/* Poster and Details */}
      <div className='flex px-[5%] py-6 gap-10 items-start'>
        <img
          className='h-[50vh] object-cover rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          src={`https://image.tmdb.org/t/p/original${tv.detail.poster_path || tv.detail.backdrop_path}`}
          alt='poster'
        />
        <div className='w-full'>
          <h1 className='text-5xl font-black'>
            {tv.detail.name || tv.detail.title || tv.detail.original_name || tv.detail.original_title}
            <small className='text-xl text-zinc-100 font-medium'> ({tv.detail.first_air_date?.split('-')[0]})</small>
          </h1>

          <div className='flex items-center gap-4 mt-4 text-lg'>
            <i className='ri-star-fill text-amber-500 text-3xl'></i>
            <span className='text-2xl font-bold'>{tv.detail.vote_average.toFixed(1)}</span>
            <span>User Score</span>
            <span>{tv.detail.release_date}</span>
            <span>{tv.detail.genres.map(g => g.name).join(', ')}</span>
            <span>{tv.detail.runtime} min</span>
          </div>

          <p className='mt-4 italic text-xl text-[#c2c2c2]'>{tv.detail.tagline}</p>
          <h2 className='mt-4 font-semibold text-xl'>Overview:</h2>
          <p className='text-zinc-300'>{tv.detail.overview}</p>

          <h2 className='mt-4 font-semibold text-xl'>Translated:</h2>
          <p className='text-zinc-300 mb-5'>{tv.translations.join(', ')}</p>

          <Link to={`${pathname}/trailer`} className='inline-block px-6 py-3 text-xl bg-[#6556cd] rounded-md hover:bg-[#4e46b5] transition-all'>
            <i className='ri-play-large-fill'></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Watch Providers */}
      <div className='px-[5%] mt-5 flex flex-col gap-6'>
        {['flatrate', 'rent', 'buy'].map(type => (
          tv.watchproviders?.[type] && (
            <div key={type} className='flex items-center gap-4'>
              <h1 className='text-lg font-semibold capitalize'>Available on {type}</h1>
              <div className='flex gap-3'>
                {tv.watchproviders[type].map((w, i) => (
                  <img
                    key={i}
                    title={w.provider_name}
                    src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                    className='w-10 h-10 object-contain rounded-md hover:scale-110 transition-all'
                    alt='provider'
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Seasons */}
      <hr className='mt-10 border-zinc-600' />
      <h1 className='text-3xl p-5 font-bold text-zinc-100'>Seasons</h1>
      <div className='flex overflow-x-auto gap-6 px-5 pb-5 scrollbar-thin scrollbar-thumb-[#6556cd]/60'>
        {(tv.detail.seasons.length > 0 ? tv.detail.seasons : tv.similar).map((season, index) => (
          <div
            key={index}
            className='min-w-[180px] max-w-[200px] flex-shrink-0 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl bg-[#1f1f1f] rounded-lg'
          >
            <img
              src={ season.poster_path?  `https://image.tmdb.org/t/p/w300${season.poster_path}`:noimage}
              alt={season.name}
              className='rounded-t-lg w-full h-[250px] object-cover'
            />
            <p className='mt-2 px-2 pb-2 text-zinc-200 text-sm font-medium truncate'>{season.name}</p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <hr className='mt-10 border-zinc-600' />
      <h1 className='text-3xl p-5 font-bold text-zinc-100'>Recommendations & Similar</h1>
      <Horizontalcard data={tv.recommendations.length > 0 ? tv.recommendations : tv.similar} />

      <Outlet />
    </div>
  ) : <Loading />
}

export default Tvdetails
