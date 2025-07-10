import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'
import Cardverical from './partials/Cardverical'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
  const navigate = useNavigate()
//   const [category, setcategory] = useState('all')

//   const [duration, setduration] = useState('day')
const [category, setcategory] = useState(localStorage.getItem('trendingCategory') || 'all');
const [duration, setduration] = useState(localStorage.getItem('trendingDuration') || 'day');

  const [trending, settrending] = useState([])
  const [page, setpage] = useState(1)
  const [hasmore, sethasmore] = useState(true)

  document.title = `RMDB | Trending ${category.toUpperCase()}`

  const handleCategoryChange = (e) => {
  const value = e.target.value;
  setcategory(value);
  localStorage.setItem('trendingCategory', value);
};

const handleDurationChange = (e) => {
  const value = e.target.value;
  setduration(value);
  localStorage.setItem('trendingDuration', value);
};


  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`)
      if (data.results.length > 0) {
        settrending(prev => [...prev, ...data.results])
        setpage(prev => prev + 1)
      } else {
        sethasmore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    settrending([])
    setpage(1)
    sethasmore(true)
  }, [category, duration])

  useEffect(() => {
    if (page === 1) {
      GetTrending()
    }
  }, [page])

  return trending.length > 0 ? (
    <div
      id="scrollableDiv"
      className='w-screen min-h-screen bg-[#18171b] overflow-y-auto p-6 text-white'
    >
      
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 sm:px-6 py-4 gap-4 sm:gap-6">
  <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-300 flex items-center">
    <i
      onClick={() => navigate(-1)}
      className="text-3xl sm:text-4xl mr-3 hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"
    ></i>
    Trending
    <small className="text-zinc-400 text-sm ml-2">({category})</small>
  </h1>

  <div className="w-full lg:w-[50%]">
    <Topnav />
  </div>
</div>
      

      {/* Section Title */}
      <div className="w-[90%] flex items-center justify-between bg-zinc-800 px-5 py-3 mx-auto  rounded-md mb-5 mt-2">
    <h1 className='md:text-2xl text-[20px] w-[20%] font-semibold lg:w-[80%] '><i className="mr-4 ri-fire-fill"></i>Latest Releases</h1>
<div className='flex w-[70%]  md:w-[50%] items-center gap-2'>
          <Dropdown
            value={category}
            title='Category'
            options={['tv', 'movie', 'all']}
            func={handleCategoryChange}
          />
          <Dropdown
            value={duration}
            title='Duration'
            options={['day', 'week']}
            func={handleDurationChange}
          />
        </div>
</div>

      {/* Trending List */}
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasmore}
        loader={<Loading />}
        scrollableTarget='scrollableDiv'
      >
        <Cardverical data={trending} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  )
}

export default Trending