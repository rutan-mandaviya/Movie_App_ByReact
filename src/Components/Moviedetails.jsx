import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie } from '../store/actions/movieaction';
import { removemovie } from '../store/reducers/movieSlice';
import Loading from './Loading';
import Horizontalcard from './partials/Horizontalcard';

const Moviedetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const movie = useSelector((state) => state.movie.moviedata);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return movie ? (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-y-auto px-4 md:px-10 py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${movie?.detail.backdrop_path})`
      }}
    >
      {/* Top Nav */}
      <nav className="w-full flex flex-wrap items-center gap-4 text-sm md:text-2xl mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-[#6556cd]">
          <i className="text-lg md:text-2xl ri-arrow-left-line"></i>
        </button>
          <span className='font-semibold'>Trending</span>
        <a title="Webpage" target="_blank" href={movie.detail.homepage}><i className="ri-external-link-line"></i></a>
        <a title="Wikipedia" target="_blank" href={`https://www.wikidata.org/wiki/${movie.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
        <a title="IMDb" target="_blank" href={`https://www.imdb.com/title/${movie.detail.imdb_id}/`}>IMDB</a>
      </nav>

      {/* Poster + Details */}
      <div className="flex flex-col lg:flex-row gap-8 items-start mb-6">
        <img
          className="w-full lg:w-auto max-w-[300px] h-auto object-cover shadow-lg rounded-md"
          src={`https://image.tmdb.org/t/p/w500/${movie.detail.poster_path || movie.detail.backdrop_path}`}
          alt="poster"
        />

        <div className="flex-1 space-y-4 text-white">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            {movie.detail.title || movie.detail.name || movie.detail.original_name}
            <small className="ml-2 text-lg text-zinc-300 font-medium">({movie.detail.release_date.split('-')[0]})</small>
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <i className="ri-star-fill text-amber-500 text-2xl"></i>
            <span className="text-xl font-semibold">{movie.detail.vote_average.toFixed(1)}</span>
            <span>User Score</span>
            <span>{movie.detail.release_date}</span>
            <span>{movie.detail.genres.map((g) => g.name).join(', ')}</span>
            <span>{movie.detail.runtime}m</span>
          </div>

          <h2 className="italic text-lg text-zinc-300">{movie.detail.tagline}</h2>
          <h3 className="font-semibold text-xl">Overview:</h3>
          <p className="text-zinc-300">{movie.detail.overview}</p>
          <h3 className="font-semibold text-xl">Translated:</h3>
          <p className="text-zinc-300">{movie.translations.join(', ')}</p>

          <Link
            to={`${pathname}/trailer`}
            className="inline-block px-6 py-3 text-lg font-medium rounded bg-[#6556cd] hover:bg-[#4d41a6] transition duration-300"
          >
            <i className="ri-play-fill mr-2"></i> Watch Trailer
          </Link>
        </div>
      </div>

      {/* Providers */}
      <div className="space-y-4 text-white">
        {movie.watchproviders?.flatrate && (
          <div className="flex flex-wrap items-center gap-3">
            <h4>Available on Platforms:</h4>
            {movie.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-10 h-10 rounded object-contain"
                src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {movie.watchproviders?.rent && (
          <div className="flex flex-wrap items-center gap-3">
            <h4>Available on Rent:</h4>
            {movie.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-10 h-10 rounded object-contain"
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {movie.watchproviders?.buy && (
          <div className="flex flex-wrap items-center gap-3">
            <h4>Available on Buy:</h4>
            {movie.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-10 h-10 rounded object-contain"
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <hr className="mt-10 border-zinc-600" />
      <h2 className="text-2xl font-bold text-zinc-200 mt-5 mb-2">Recommendations & Similar</h2>
      <Horizontalcard data={movie.recommendations.length > 0 ? movie.recommendations : movie.similar} />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
