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
       
        <div className="w-full flex items-center justify-between ">
        <h1 className='text-3xl font-semibold text-zinc-300  '>
            <i onClick={()=>navigate(-1)} className=" mr-5 hover:text-[#6556cd] ri-arrow-left-line"></i>
             Popular
        </h1>

        <div className="flex  items-center w-full ">
            <div className="w-full">

            <Topnav></Topnav>
            


            </div>
            <Dropdown value={category} title="Category"  options={["tv","movie"]}  func={handlecategory}></Dropdown>
            <div className="w-[2%]"></div>
            {/* <Dropdown value={duration} title="Duration"  options={["day","week"]}  func={(e)=>setduration(e.target.value)}></Dropdown> */}
        </div>


        </div>

<div className="w-[90%] bg-zinc-800 px-5 py-4 mx-auto text-2xl font-semibold rounded-md mb-5 mt-2">
    <h1><i className="ri-fire-fill"></i>Latest Releases</h1>
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