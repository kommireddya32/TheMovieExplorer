import { useEffect, useState } from "react";
import { getGenre } from "../../assets/data";
import MovieCard from "../cards/MovieCard";
import Footer from "../footer/Footer";
export default function GenreFetch(props){
    const [movies,setMovies] = useState([]);
        useEffect(()=>{
            async function fetchMovies(){
                const data = await getGenre(props.genreId, props.current);
                setMovies(data);
            }
            fetchMovies();
            
        },[props.current,props.genreId])
        return(
            <>
                <div className="movie-list">
                    {movies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}
                </div>
                <Footer current={props.current} setCurrent={props.setCurrent}/>
                
            </>
        )
}