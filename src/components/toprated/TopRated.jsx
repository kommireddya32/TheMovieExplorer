import { useEffect, useState } from "react";
import {getTopRatedMovies} from "../../assets/data";
import MovieCard from "../cards/MovieCard";
import "./TopRated.css"
import Footer from "../footer/Footer";
export default function TopRated(props){
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        async function fetchMovies(){
            const data = await getTopRatedMovies(props.current);
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