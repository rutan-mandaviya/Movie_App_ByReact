import axios from '../../utils/axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {



  return (
   <div className='w-[22%] h-full  border-r-2  border-zinc-400 px-5'>
      <h1 className='text-2xl font-bold flex mt-5 gap-2  '>
      <i className="text-[#6556CD] ri-tv-fill"></i>
      <span >RMDB</span>
      </h1>

      <nav className='flex flex-col text-zinc-400 text-xl gap-4'>
        <h1 className='text-white  font-medium mt-10  mb-2'>New Feed</h1>
        <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'><i className="mr-2 ri-fire-fill"></i> Trending</Link>

        <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'><i className="mr-2 ri-bard-fill"></i> Popular</Link>

        <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'><i className="mr-2 ri-movie-fill"></i> Movies</Link>

        <Link to="/tvshows" className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'><i className="mr-2 ri-tv-fill"></i> Tv Shows</Link>

        <Link to="/person" className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'><i className="mr-2 ri-group-fill"></i> People</Link>
      </nav>
      <hr className='border-none h-[1px] mt-2  bg-zinc-400' />
      <nav className='flex flex-col text-zinc-400 text-xl gap-4'>
        <h1 className='text-white  font-medium mt-5 mb-5 '>Website Info.</h1>
        <Link className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'><i className="mr-2 ri-information-fill"></i> About RMDB</Link>

        <Link className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'><i className="mr-2 ri-phone-fill"></i> Contact us</Link>

      
      </nav>

   </div>
  )
}

export default Sidenav