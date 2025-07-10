import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate=useNavigate()
  return (

    <div className="w-[80%] h-[80%]">
   
            <Link className=' absolute top-5   rounded-full flex justify-center text-5xl font-semibold '>  </Link>


   <DotLottieReact 
      src="https://lottie.host/3d2b362c-29ac-4d4a-9630-8e64f7a00b8e/wFPkZmNLdV.lottie"
      loop
      autoplay
      />
      </div>
  )
}

export default Notfound