import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import Loading from './Components/Loading';
import Trending from './Components/Trending';
import Popular from './Components/Popular';
import Movie from './Components/Movie';
import Tvshows from './Components/Tvshows';
import People from './Components/People';
import Moviedetails from './Components/Moviedetails';
import Tvdetails from './Components/Tvdetails';
import Persondetails from './Components/Persondetails';
import Trailer from './Components/partials/Trailer';
import Notfound from './Components/Notfound';


const App = () => {


  

  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<Tvdetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<Persondetails />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
