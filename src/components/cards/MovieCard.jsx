import { useNavigate } from "react-router-dom";
import "./MovieCard.css"

export default function MovieCard(props) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/movie/${props.movie.id}`);
    };
    
    return (
        <div className="movie-card" onClick={handleClick}>
            {props.movie.poster_path ? (
                <img 
                    src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`} 
                    alt={props.movie.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector('.footer').insertAdjacentHTML('beforebegin', 
                            '<div class="no-poster-card"><div class="no-poster-icon">🎬</div></div>');
                    }}
                />
            ) : (
                <div className="no-poster-card">
                    <div className="no-poster-icon">🎬</div>
                </div>
            )}
            <div className="footer">
                <h1>{props.movie.title}</h1>
                <div className="card-bottom">
                    <h1>⭐ {Math.round(props.movie.vote_average * 10) / 10}/10</h1>
                    <h2>{props.movie.release_date?.substring(0, 4)}</h2>
                </div>
            </div>
        </div>
    )
}