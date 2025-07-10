import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import Cardverical from './partials/Cardverical';

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Dynamically set document title
  useEffect(() => {
    document.title = `RMDB | People - ${category.toUpperCase()}`;
  }, [category]);

  // ✅ Fetch data
  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPerson(prev => [...prev, ...data.results]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ✅ Reset when category changes
  useEffect(() => {
    setPerson([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  // ✅ Fetch initial data on first render or category change
  useEffect(() => {
    getPerson();
  }, [category, page === 1]);

  return person.length > 0 ? (
    <div
      id="scrollableDiv"
      className="w-screen min-h-screen bg-[#18171b] overflow-y-auto p-4 sm:p-5"
    >
      {/* 🔼 Top Bar */}
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between px-2 sm:px-4 py-3 gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-300 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="text-3xl sm:text-4xl mr-3 hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"
          ></i>
          People
          <small className="text-zinc-400 text-sm ml-2">({category})</small>
        </h1>

        <div className="w-full lg:w-[50%]">
          <Topnav />
        </div>
      </div>

      {/* 🔥 Section Header */}
      <div className="w-full sm:w-[90%] bg-zinc-800 px-4 sm:px-5 py-3 mx-auto text-xl sm:text-2xl font-semibold rounded-md mb-5 mt-2 text-white">
        <h1><i className="ri-fire-fill text-red-500"></i> Celebrities </h1>
      </div>

      {/* 🧑‍🤝‍🧑 Infinite Scroll Section */}
      <InfiniteScroll
        dataLength={person.length}
        next={getPerson}
        hasMore={hasMore}
        loader={<Loading />}
        scrollableTarget="scrollableDiv"
      >
        <Cardverical data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
