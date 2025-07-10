import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noimage from "/noimage.png"

const Cardverical = ({data,title}) => {
  
  return (
    <div className='w-[90%] mx-auto  flex  flex-wrap justify-between  items-center '>
                    {/* <i onClick={()=>navigate(-1)} className=" mr-5 hover:text-[#6556cd] ri-arrow-left-line"></i> */}

            
            {data.map((items,index)=>(<Link to={`/${items.mediatype  || title }/details/${items.id}`} className='w-[32vh]   mb-[5%]' key={index}>
            <img className='w-full h-[45vh] object-cover  shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]' src={items.poster_path || items.backdrop_path || items.profile_path ? `https://image.tmdb.org/t/p/w300/${
                 items.poster_path || items.backdrop_path || items.profile_path
              }`:noimage} alt="" />
            

            <h1 className='text-xl font-medium text-zinc-300 mt-3 '>

                 {items.name ||
                  items.title ||
                  items.original_name ||
                  items.original_title}
            </h1>

            {items.vote_average &&  <div className="flex   items-center gap-1 text-xl">
                <i className="text-amber-500  ri-star-fill"></i>
                <h1>{(items.vote_average).toFixed(1)}</h1>
            </div>
            }
           
            </Link>
        
        
        ))}
    </div>
  )
}

export default Cardverical