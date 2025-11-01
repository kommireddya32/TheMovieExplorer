import { useEffect, useState } from "react";
import {getTopRatedMovies, getUpcomingMovies} from "../../assets/data";
import MovieCard from "../cards/MovieCard";
import "./UpComing.css"
import Footer from "../footer/Footer";
export default function UpComing(props){
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        async function fetchMovies(){
            const data = await getUpcomingMovies(props.current);
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