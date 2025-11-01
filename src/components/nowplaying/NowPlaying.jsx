import { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../../assets/data";
import MovieCard from "../cards/MovieCard";
import "./NowPlaying.css"
import Footer from "../footer/Footer";
export default function NowPlaying(props){
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        async function fetchMovies(){
            const data = await getNowPlayingMovies(props.current);
            setMovies(data);
        }
        fetchMovies();
        
    },[props.current])
    return(
        <>
            <div className="movie-list">
                {movies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}
            </div>
            <Footer current={props.current} setCurrent={props.setCurrent}/>
        </>
    )
}