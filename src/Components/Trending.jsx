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
      {/* Header */}
      <div className='flex items-center justify-evenly mb-6'>
        <h1 className='w-[20%]text-3xl font-bold text-zinc-100 flex items-center gap-4'>
          <i
            onClick={() => navigate(-1)}
            className='ri-arrow-left-line text-2xl hover:text-[#6556cd] cursor-pointer'
          ></i>
          Trending
        </h1>
    <div className='w-[100vw]'>
        <Topnav />
      </div>
        <div className='flex w-[30%] items-center gap-2'>
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

      {/* Topnav */}
      

      {/* Section Title */}
      <div className='w-[90%] mx-auto bg-zinc-800 px-5 py-3 text-2xl rounded-lg font-semibold text-white flex items-center gap-3 mb-6'>
        <i className='ri-fire-fill text-[#ff5e5e]'></i>
        Latest Releases
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