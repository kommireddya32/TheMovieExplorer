import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./components/home/Home";
import { useRef, useState } from "react";
import GenreFetch from "./components/genre/GenreFetch";
import TopRated from "./components/toprated/TopRated";
import NotFound from "./NotFound";
import UpComing from "./components/upcoming/Upcoming";
import NowPlaying from "./components/nowplaying/NowPlaying";
import SearchMovies from "./components/searchmovies/SearchMovies";
import AboutMovieCard from "./components/aboutmovie/AboutMovieCard";


function App() {
  const inputRef = useRef();
  const [current,setCurrent] = useState(1);
  const [mode,setMode] = useState("light");
  
  let rooter = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Routes with Header and Footer */}
        <Route path="/" element={<RootLayout current={current} setCurrent={setCurrent} mode={mode} setMode={setMode} inputRef={inputRef}/>}>
          <Route index element={<Home current={current} setCurrent={setCurrent}/>}/>
          <Route path="search" element={<SearchMovies current={current} setCurrent={setCurrent} />}/>
          <Route path="top-rated" element={<TopRated current={current} setCurrent={setCurrent}/>}/>
          <Route path="upcoming" element={<UpComing current={current} setCurrent={setCurrent}/>}/>
          <Route path="now-playing" element={<NowPlaying current={current} setCurrent={setCurrent}/>}/>
          <Route path="action" element={<GenreFetch genreId={28} current={current} setCurrent={setCurrent}/>}/>
          <Route path="adventure" element={<GenreFetch genreId={12} current={current} setCurrent={setCurrent}/>}/>
          <Route path="animation" element={<GenreFetch genreId={16} current={current} setCurrent={setCurrent}/>}/>
          <Route path="comedy" element={<GenreFetch genreId={35} current={current} setCurrent={setCurrent}/>}/>
          <Route path="crime" element={<GenreFetch genreId={80} current={current} setCurrent={setCurrent}/>}/>
          <Route path="documentary" element={<GenreFetch genreId={99} current={current} setCurrent={setCurrent}/>}/>
          <Route path="drama" element={<GenreFetch genreId={18} current={current} setCurrent={setCurrent}/>}/>
          <Route path="family" element={<GenreFetch genreId={10751} current={current} setCurrent={setCurrent}/>}/>
          <Route path="fantasy" element={<GenreFetch genreId={14} current={current} setCurrent={setCurrent}/>}/>
          <Route path="history" element={<GenreFetch genreId={36} current={current} setCurrent={setCurrent}/>}/>
          <Route path="horror" element={<GenreFetch genreId={27} current={current} setCurrent={setCurrent}/>}/>
          <Route path="music" element={<GenreFetch genreId={10402} current={current} setCurrent={setCurrent}/>}/>
          <Route path="mystery" element={<GenreFetch genreId={9648} current={current} setCurrent={setCurrent}/>}/>
          <Route path="romance" element={<GenreFetch genreId={10749} current={current} setCurrent={setCurrent}/>}/>
          <Route path="science-fiction" element={<GenreFetch genreId={878} current={current} setCurrent={setCurrent}/>}/>
          <Route path="tv-movie" element={<GenreFetch genreId={10770} current={current} setCurrent={setCurrent}/>}/>
          <Route path="thriller" element={<GenreFetch genreId={53} current={current} setCurrent={setCurrent}/>}/>
          <Route path="war" element={<GenreFetch genreId={10752} current={current} setCurrent={setCurrent}/>}/>
          <Route path="western" element={<GenreFetch genreId={37} current={current} setCurrent={setCurrent}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
        
        {/* Standalone route without Header and Footer */}
        <Route path="movie/:id" element={<AboutMovieCard mode={mode} setMode={setMode} />} />
      </>
    )
  )

  return (
    <RouterProvider router={rooter}/>
  )
}

export default App
