import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white relative">
      <DotLottieReact
        src="https://lottie.host/9b12b94a-d37d-4e95-b204-84a078017e86/2vkWoYO5kL.lottie"
        loop
        autoplay
        className="w-40 h-40"
      />

     <h1 className="mt-6 text-lg md:text-xl font-semibold text-gray-700 text-center px-4">
  📶 Connect your Wi-Fi/router to the internet for the website to work.
  <br />
  ⚠️ If you are still facing loading issues, it’s not the website problem — this is due to the main API issue.
</h1>
    </div>
  );
};

export default Loading;
