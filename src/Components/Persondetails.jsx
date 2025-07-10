import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadperson } from '../store/actions/personaction'

import Loading from './Loading'
import Horizontalcard from './partials/Horizontalcard'
import { removeperson } from '../store/reducers/personSlice'
import Dropdown from './partials/Dropdown'


const Persondetails = () => {

  const {id}=useParams()
      const dispatch=useDispatch()
      const navigate=useNavigate()
      const {pathname}=useLocation()
      const person=useSelector((state)=>state.person.persondata)
      const [category, setcategory] = useState(localStorage.getItem("persondetails")||"movie")
  

  const handleCategoryChange=(e)=>{
    const value=e.target.value
    setcategory(value)
    localStorage.setItem("persondetails",value)
  }
  
      useEffect(()=>{
          dispatch(asyncloadperson(id))
          return (()=>{
              dispatch(removeperson())
          })
          
      },[id])
  
  
  return person ?(
    <div className='w-screen px-10 py-5  overflow-y-auto'>

      {/* part-1  nav bar */}
         <nav className='h-[10vh] w-full flex items-center gap-10 text-xl'>
      
                  <Link className='text-3xl'>
                  
                    <i onClick={()=>navigate(-1)} className="text-3xl mr-5 hover:text-[#6556cd] ri-arrow-left-line"></i>
                   Person</Link>
      
                   {/* <a title='webpage' target='_blank' href={c.homepage}><i className="ri-external-link-line"></i></a>
                   <a title='wekipidia' target='_blank' href={`https://www.wikidata.org/wiki/${person.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
                   <a title='imdb' target='_blank' href={`https://www.imdb.com/title/${person.detail.imdb_id}/`}>IMDB</a> */}
          </nav>



    <div className="w-full flex  gap-[5%] items-start ">
      {/* part -2 left poster and details */}

      <div className="w-[20%] ">

      <img className='w-full h-[50vh] object-cover rounded-2xl  shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]' src={`https://image.tmdb.org/t/p/original${
                person.detail.profile_path 
            }`} alt="" />

      <hr className='mt-3 mb-2  text-zinc-400'/>
      

      {/* social media link */}

      <div className=" text-3xl flex gap-x-5 ">
 
                   <a title='wekipidia' target='_blank' href={`https://www.wikidata.org/wiki/${person.externalid.wikidata_id}`}><i className="text-gray-500 ri-earth-fill"></i></a>
                   <a title='facebooke' target='_blank' href={`https://www.facebook.com/${person.externalid.facebook_id}`}><i className="text-blue-500 ri-facebook-circle-fill"></i></a>
                   <a title='instagram' target='_blank' href={`https://www.instagram.com/${person.externalid.instagram_id}`}><i className="text-[#fe008f] ri-instagram-fill"></i></a>      
                   <a title='instagram' target='_blank' href={`https://www.twitter.com/${person.externalid.twitter_id}`}><i className="text-white ri-twitter-x-fill"></i></a>      

      </div>

      {/* peersonal details */}

      <h1 className='text-xl text-zinc-400 my-2 font-semibold'>Personal info</h1>
      <h1 className='text text-zinc-400 font-semibold leading-4 '>Known For </h1>
      <h3 className='text-zinc-200 mb-2'>{person.detail.known_for_department}</h3>

      <h1 className='text text-zinc-400 font-semibold leading-4 '>Gender </h1>
      <h3 className='text-zinc-200 mb-2'>{person.detail.gender ===2 ? "male" :"female"}</h3>


      <h1 className='text text-zinc-400 font-semibold leading-4 '>Birth-day </h1>
      <h3 className='text-zinc-200 mb-2'>{person.detail.birthday}</h3>


      <h1 className='text text-zinc-400 font-semibold leading-4 '>Death-day </h1>
      <h3 className='text-zinc-200 mb-2'>{person.detail.deathday ?person.detail.deathday:"Still alive"}</h3>

      <h1 className='text text-zinc-400 font-semibold leading-4 '>Place of birth </h1>
      <h3 className='text-zinc-200 mb-2'>{person.detail.place_of_birth}</h3>

      <h1 className='text text-zinc-400 font-semibold leading-4 '>Also known As </h1>
      <h3 className='w-[15vw] text-zinc-200 mb-2'>{person.detail.also_known_as.join(", ")}</h3>






      </div>


      <div className="w-[80%] h-full ">
         <h1 className='text-5xl text-zinc-100 my-2 font-semibold'>{person.detail.name}</h1>
      <h1 className='text-xl text-zinc-200 font-semibold  '>Biography </h1>
      <h3 className='text-zinc-400 mb-5'>{person.detail.biography.slice(0,1000)}</h3>
            {/* <h1>Known for</h1> */}
      <h1 className='text-xl text-zinc-200 font-semibold  mb-5'>Known for </h1>
      <Horizontalcard data={person.combined_credits.cast}></Horizontalcard>

      <div className="w-full flex justify-between mt-5">
                  <h1 className='text-4xl text-zinc-200 font-semibold  '>Acting </h1>
            <Dropdown value={category} title="Category"  options={["tv","movie"]}  func={handleCategoryChange}></Dropdown>

      </div>

      <div className="list-disc w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg text-zinc-400  shadow-white mt-5 p-5">
       
       {person[category +"_credits"].cast.map((c,i)=>( <li title='Redirect to link' key={i} className='hover:text-white hover:bg-zinc-900 cursor-pointer duration-300 px-5 py-5 rounded-md '>
          <Link  to={`/${category}/details/${c.id}`}>
          <span> Movie Name : {c.name || c.title || c.original_name || c.original_title} </span>
          <span className=' block ml-5'>Character Name: {c.character}</span>
          </Link>
         </li>))}
       

      </div>

      </div>





    </div>

    </div>
  ):<Loading></Loading>
}

export default Persondetails