import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadperson } from '../store/actions/personaction'
import { removeperson } from '../store/reducers/personSlice'
import Loading from './Loading'
import Horizontalcard from './partials/Horizontalcard'
import Dropdown from './partials/Dropdown'

const Persondetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const person = useSelector((state) => state.person.persondata)
  const [category, setcategory] = useState(localStorage.getItem("persondetails") || "movie")

  const handleCategoryChange = (e) => {
    const value = e.target.value
    setcategory(value)
    localStorage.setItem("persondetails", value)
  }

  useEffect(() => {
    dispatch(asyncloadperson(id))
    return () => dispatch(removeperson())
  }, [id])

  return person ? (
    <div className="w-full min-h-screen px-4 md:px-10 py-5 bg-[#0e0e0e] text-white overflow-y-auto">
      {/* Navbar */}
      <nav className="flex items-center gap-4 text-lg mb-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-[#6556cd]">
          <i className="ri-arrow-left-line text-2xl"></i>
          Person
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-[25%] flex flex-col gap-4">
          <img
            src={`https://image.tmdb.org/t/p/original${person.detail.profile_path}`}
            className="w-full h-auto rounded-xl object-cover shadow-lg"
            alt="person"
          />

          <div className="flex gap-4 text-2xl mt-2">
            <a className=' hover:scale-150' target="_blank" title="Wikipedia" href={`https://www.wikidata.org/wiki/${person.externalid.wikidata_id}`}><i className="text-gray-400   ri-earth-fill"></i></a>
            <a className=' hover:scale-150' target="_blank" title="Facebook" href={`https://www.facebook.com/${person.externalid.facebook_id}`}><i className="text-blue-500 ri-facebook-circle-fill"></i></a>
            <a className=' hover:scale-150' target="_blank" title="Instagram" href={`https://www.instagram.com/${person.externalid.instagram_id}`}><i className="text-pink-500 ri-instagram-fill"></i></a>
            <a className=' hover:scale-150' target="_blank" title="Twitter/X" href={`https://www.twitter.com/${person.externalid.twitter_id}`}><i className="text-white ri-twitter-x-fill"></i></a>
          </div>

          <div className="text-sm mt-4 space-y-3">
            <h2 className="text-xl text-zinc-300 font-semibold">Personal Info</h2>

            <div><span className="text-zinc-400">Known For:</span> <br /> {person.detail.known_for_department}</div>
            <div><span className="text-zinc-400">Gender:</span> <br /> {person.detail.gender === 2 ? "Male" : "Female"}</div>
            <div><span className="text-zinc-400">Birthday:</span> <br /> {person.detail.birthday}</div>
            <div><span className="text-zinc-400">Death:</span> <br /> {person.detail.deathday || "Still alive"}</div>
            <div><span className="text-zinc-400">Place of Birth:</span> <br /> {person.detail.place_of_birth}</div>
            <div><span className="text-zinc-400">Also Known As:</span>
              <p className="text-zinc-200 text-xs mt-1">{person.detail.also_known_as.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Main Info */}
        <div className="flex-1 space-y-6 overflow-x-hidden">
          <h1 className="text-4xl font-bold">{person.detail.name}</h1>

          <div>
            <h2 className="text-xl text-zinc-300 font-semibold mb-2">Biography</h2>
            <p className="text-zinc-400 text-justify">{person.detail.biography.slice(0, 1200) || "Biography not available."}</p>
          </div>

          <div>
            <h2 className="text-xl text-zinc-300 font-semibold mb-3">Known For</h2>
            <Horizontalcard data={person.combined_credits.cast} />
          </div>

          <div className="flex justify-between items-center mt-8 ">
          </div>
<div className="w-[100%] flex items-center justify-between bg-zinc-800 px-5 py-4 mx-auto  rounded-md mb-5 mt-2">
            <h2 className="text-3xl text-zinc-200 font-semibold">Acting</h2>
            <Dropdown value={category} title="Category" options={["tv", "movie"]} func={handleCategoryChange} />

</div>
 

          <div className="max-h-[60vh] overflow-y-auto bg-[#161616] rounded-lg shadow-md p-4 space-y-3 text-sm">
            {person[category + "_credits"].cast.map((c, i) => (
              <Link
                key={i}
                to={`/${category}/details/${c.id}`}
                className="block hover:bg-[#252525]   px-3 py-3 rounded-md transition"
              >
                <div className="font-semibold text-white truncate">🎬 {c.name || c.title || c.original_name || c.original_title}</div>
                <div className="ml-3 text-zinc-400 truncate">🧑‍🎤 as {c.character || "Unknown"}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  ) : <Loading />
}

export default Persondetails
