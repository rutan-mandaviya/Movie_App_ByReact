import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './Components/Loading';

// Lazy loaded components
const Home = lazy(() => import('./Components/Home'));
const Trending = lazy(() => import('./Components/Trending'));
const Popular = lazy(() => import('./Components/Popular'));
const Movie = lazy(() => import('./Components/Movie'));
const Tvshows = lazy(() => import('./Components/Tvshows'));
const People = lazy(() => import('./Components/People'));
const Moviedetails = lazy(() => import('./Components/Moviedetails'));
const Tvdetails = lazy(() => import('./Components/Tvdetails'));
const Persondetails = lazy(() => import('./Components/Persondetails'));
const Trailer = lazy(() => import('./Components/partials/Trailer'));
const Notfound = lazy(() => import('./Components/Notfound'));

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex text-white">
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </div>
  );
};

export default App;
