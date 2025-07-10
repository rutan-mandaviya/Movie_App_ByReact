import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadmovie } from '../store/actions/movieaction'
import { removemovie } from '../store/reducers/movieSlice'
import Loading from './Loading'
import Horizontalcard from './partials/Horizontalcard'
import Trailer from './partials/Trailer'

const Moviedetails = () => {

    const {id}=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {pathname}=useLocation()
    const movie=useSelector((state)=>state.movie.moviedata)





    useEffect(()=>{
        dispatch(asyncloadmovie(id))
        return (()=>{
            dispatch(removemovie())
        })
        
    },[id])



  return movie ?(
    <div className='w-screen h-screen relative bg-cover overflow-y-auto bg-center bg-no-repeat px-10 py-5 ' style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${movie?.detail.backdrop_path },)`
      }} >



{/* part 1  */}
        <nav className='h-[10vh] w-full flex items-center gap-10 text-xl'>

            <Link>
            
              <i onClick={()=>navigate(-1)} className="text-2xl mr-5 hover:text-[#6556cd] ri-arrow-left-line"></i>
             Trending</Link>

             <a title='webpage' target='_blank' href={movie.detail.homepage}><i className="ri-external-link-line"></i></a>
             <a title='wekipidia' target='_blank' href={`https://www.wikidata.org/wiki/${movie.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
             <a title='imdb' target='_blank' href={`https://www.imdb.com/title/${movie.detail.imdb_id}/`}>IMDB</a>
        </nav>
{/* part 2 poster and details */}


        <div className="w-full flex px-[5%] py-6 gap-20  items-start">

            <img className=' h-[50vh] object-cover  shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]' src={`https://image.tmdb.org/t/p/original${
                movie.detail.poster_path || movie.detail.backdrop_path
            }`} alt="" />


            <div className="w-[80%] ">
                <h1 className='text-5xl w-[70%] font-black'>{movie.detail.name || movie.detail.title || movie.detail.original_name || movie.detail.original_title}
                    <small className='text-xl text-zinc-100 font-medium'> ({movie.detail.release_date.split('-')[0]})</small>
                </h1>
                
                <div className="w-fit px-1 py-2 flex mb-4    items-center gap-3  rounded-full">
                <i className="text-3xl text-amber-500  ri-star-fill"></i>
                <h1 className='font-semibold text-3xl'>{(movie.detail.vote_average).toFixed(1)}</h1>
                <h1> user score</h1>
                <h1>{movie.detail.release_date}</h1>
                <h1>{movie.detail.genres.map((g)=>g.name).join(",")}</h1>
                <h1>{movie.detail.runtime}m</h1>
                </div>

                <h1 className='text-xl font-semibold  italic'>{movie.detail.tagline}</h1>
                <h1 className='text-xl font-semibold'>overview :</h1>
                <p className='text-zinc-300'> {movie.detail.overview}</p>
                <h1 className='text-xl font-semibold'>Translated :</h1>
                <p className='w-fit mb-5 text-zinc-300'> {movie.translations.join(", ")}</p>


                <Link className=' px-6 py-3 text-xl rounded-md font-medium bg-[#6556cd] ' to={`${pathname}/trailer`}><i className="ri-play-large-fill"></i>{" "}Play Trailer</Link>

            </div>

        </div>

        {/* part -3  plateforms */}

        <div className="w-fit mt-5  flex flex-col gap-4 px-[5%]">
            
       
        {movie.watchproviders && movie.watchproviders.flatrate && (<div className='flex gap-x-3 items-center justify-start '>

            <h1>Avilable on Plateforms</h1>
            <div className="">

            {movie.watchproviders.flatrate.map((w, i) => (
                <img
                key={i}
                title={w.provider_name}
                className="w-10 h-10 rounded-md object-contain inline-block mx-2"
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt="provider"
                /> ))}
                </div>
        </div>)}
        
      


        
        {movie.watchproviders && movie.watchproviders.rent && (<div className='flex gap-x-3 items-center justify-start'>

            <h1>Avilable on Rent</h1>
            <div className="">

            {movie.watchproviders.rent.map((w, i) => (
                <img
                key={i}
                title={w.provider_name}
                className="w-10 h-10 rounded-md object-contain inline-block mx-2"
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt="provider"
                /> ))}
                </div>
        </div>)}
        

        {movie.watchproviders && movie.watchproviders.buy && (<div className='flex gap-x-3 items-center justify-start'>

            <h1>Avilable on Buy</h1>
            <div className="">

            {movie.watchproviders.buy.map((w, i) => (
                <img
                title={w.provider_name}
                key={i}
                className="w-10 h-10 rounded-md object-contain inline-block mx-2"
                src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                alt="provider"
                /> ))}
                </div>
        </div>)}
        

    

            
        </div>


        {/* part -4 recomdetaions and similarity */}
        <hr className='mt-6 ml-5 text-zinc-400'/>
        <h1 className=" text-3xl p-5 text-zinc-300 font-bold">Recomdetaions & similar </h1>
        <Horizontalcard data= {movie.recommendations.length>0 ? movie.recommendations : movie.similar}></Horizontalcard>
               
        <Outlet></Outlet>

    </div>
  ) :<Loading></Loading>
}

export default Moviedetails