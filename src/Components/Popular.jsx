import axios from '../utils/axios'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cardverical from './partials/Cardverical'

const Popular = () => {


        const navigate=useNavigate()
        const [category, setcategory] = useState(localStorage.getItem("poularCategory")||"movie")
        const [popular, setpopular] = useState([])
        const [page, setpage] = useState(1)
        const [hasmore, sethasmore] = useState(true)
        document.title=" RMDB | Popular " +category.toUpperCase()



        const handlecategory=(e)=>{
            const value=e.target.value
            setcategory(value)
            localStorage.setItem("poularCategory",value)
        }


    const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      
    
      if(data.results.length>0){

          setpopular(prev => [...prev, ...data.results]);
          setpage(prev => prev + 1); 

        }
        else{
            sethasmore(false)
        }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  setpopular([]);
  setpage(1);
  sethasmore(true);
}, [category]);

useEffect(() => {
  if (page === 1) {
    GetPopular();
  }
}, [page]);
    
  return (
   popular.length >0 ? (
    <div id="scrollableDiv" className='w-screen   min-h-screen bg-[#18171b]  overflow-y-auto p-5 '>
       
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 sm:px-6 py-4 gap-4 sm:gap-6">
  <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-300 flex items-center">
    <i
      onClick={() => navigate(-1)}
      className="text-3xl sm:text-4xl mr-3 hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"
    ></i>
    Popular
    <small className="text-zinc-400 text-sm ml-2">({category})</small>
  </h1>

  <div className="w-full lg:w-[50%] ">
    <Topnav />
  </div>
</div>
        

<div className="w-[90%] flex items-center justify-between bg-zinc-800 px-5 py-4 mx-auto  rounded-md mb-5 mt-2">
    <h1 className='text-2xl font-semibold '><i className="mr-4 ri-fire-fill"></i>Latest Releases</h1>
                <Dropdown value={category} title="Category"  options={["tv","movie"]}  func={handlecategory}></Dropdown>

</div>


<InfiniteScroll
dataLength={popular.length}
next={GetPopular}
hasMore={hasmore}
loader={<Loading></Loading>}
scrollableTarget="scrollableDiv"
>

        < Cardverical data={popular} title={category}/>
</InfiniteScroll>

    </div>
  ):(<Loading></Loading>)
  )
}

export default Popular