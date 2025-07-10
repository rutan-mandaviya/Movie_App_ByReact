import axios from '../../utils/axios'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidenav = () => {
  const { pathname } = useLocation();

  const isActive = (route) => pathname === route ? "bg-[#6556CD] text-white" : "";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className='hidden md:block w-[22%] h-full border-r-2 border-zinc-400 px-5'>
        <h1 className='text-2xl font-bold flex mt-5 gap-2'>
          <i className="text-[#6556CD] ri-tv-fill"></i>
          <span>RMDB</span>
        </h1>

        <nav className='flex flex-col text-zinc-400 text-xl gap-4'>
          <h1 className='text-white font-medium mt-10 mb-2'>New Feed</h1>
          <Link to="/trending" className={`hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium ${isActive("/trending")}`}>
            <i className="mr-2 ri-fire-fill"></i> Trending
          </Link>
          <Link to="/popular" className={`hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium ${isActive("/popular")}`}>
            <i className="mr-2 ri-bard-fill"></i> Popular
          </Link>
          <Link to="/movie" className={`hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium ${isActive("/movie")}`}>
            <i className="mr-2 ri-movie-fill"></i> Movies
          </Link>
          <Link to="/tvshows" className={`hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium ${isActive("/tvshows")}`}>
            <i className="mr-2 ri-tv-fill"></i> TV Shows
          </Link>
          <Link to="/person" className={`hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium ${isActive("/person")}`}>
            <i className="mr-2 ri-group-fill"></i> People
          </Link>
        </nav>

        <hr className='border-none h-[1px] mt-2 bg-zinc-400' />

        <nav className='flex flex-col text-zinc-400 text-xl gap-4'>
          <h1 className='text-white font-medium mt-5 mb-5'>Website Info.</h1>
          <Link className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'>
            <i className="mr-2 ri-information-fill"></i> About RMDB
          </Link>
          <Link className='hover:bg-[#6556CD] hover:text-white rounded-md px-5 py-2 duration-250 font-medium'>
            <i className="mr-2 ri-phone-fill"></i> Contact Us
          </Link>
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-600 flex justify-around items-center text-white py-2 z-50">
        <Link to="/trending" className={`flex flex-col items-center ${isActive("/trending")}`}>
          <i className="ri-fire-fill text-xl"></i>
          <span className="text-xs">Trending</span>
        </Link>
        <Link to="/popular" className={`flex flex-col items-center ${isActive("/popular")}`}>
          <i className="ri-bard-fill text-xl"></i>
          <span className="text-xs">Popular</span>
        </Link>
        <Link to="/movie" className={`flex flex-col items-center ${isActive("/movie")}`}>
          <i className="ri-movie-fill text-xl"></i>
          <span className="text-xs">Movies</span>
        </Link>
        <Link to="/tvshows" className={`flex flex-col items-center ${isActive("/tvshows")}`}>
          <i className="ri-tv-fill text-xl"></i>
          <span className="text-xs">TV</span>
        </Link>
        <Link to="/person" className={`flex flex-col items-center ${isActive("/person")}`}>
          <i className="ri-group-fill text-xl"></i>
          <span className="text-xs">People</span>
        </Link>
      </div>
    </>
  );
};

export default Sidenav;
