import { useEffect, useState } from "react";
import { searchMovies } from "../../assets/data";
import MovieCard from "../cards/MovieCard";
import { useSearchParams } from "react-router-dom";
import "./SearchMovies.css";

export default function SearchMovies(props) {
    const [movies, setMovies] = useState([]);
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';

    useEffect(() => {
        async function fetchMovies() {
            if (!searchTerm) {
                setMovies([]);
                return;
            }
            const results = await searchMovies(searchTerm);
            setMovies(results || []);
        }
        
        fetchMovies();
    }, [searchTerm]);

    return (
        <>
            <div className="movie-list">
                {searchTerm && movies.length === 0 ? (
                    <div className="no-results">
                        <div className="no-results-icon">🎬</div>
                        <h2>No Movies Found</h2>
                        <p>We couldn't find any movies matching "{searchTerm}"</p>
                        <p className="suggestion">Try searching with different keywords or check your spelling.</p>
                    </div>
                ) : (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
            
            {/* Developer Watermark */}
            <div className="developer-watermark">
                <div className="watermark-content">
                    <p className="watermark-text">
                        Developed with ❤️ by <span className="developer-name">Kommireddy Santhosh</span>
                    </p>
                    <div className="developer-links">
                        <a href="https://kommireddy-santhosh-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                            <span className="link-icon">🌐</span> Portfolio
                        </a>
                        <a href="https://github.com/kommireddya32" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <span className="link-icon">🔗</span> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/santhosh-kommireddy-6ba34724a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <span className="link-icon">💼</span> LinkedIn
                        </a>
                        <a href="mailto:kommireddysanthosh@gmail.com" aria-label="Email">
                            <span className="link-icon">✉️</span> kommireddysanthosh@gmail.com
                        </a>
                    </div>
                    <p className="copyright-text">
                        © {new Date().getFullYear()} Movie Explorer. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
}