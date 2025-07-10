import React from 'react'
import loader1 from "/loader1.gif"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Loading = () => {
 return (
    <div className="w-full h-full justify-center items-center">
 <DotLottieReact
      src="https://lottie.host/9b12b94a-d37d-4e95-b204-84a078017e86/2vkWoYO5kL.lottie"
      loop
      autoplay
    />
    {/* <DotLottieReact className='w-full h-full flex justify-center items-center' width={50}
      src="https://lottie.host/ef626292-2945-4ebb-bcbe-9392cd5c1e88/EYX9YtC9IE.lottie"
      loop
      autoplay
    
      
      /> */}
      </div>
//   <DotLottieReact
//       src="https://lottie.host/1c494a2a-ab27-46ee-b0e4-66074a57b1af/eMfOis4WWT.lottie"
//       loop
//       autoplay
//     />
  );
}

export default Loading