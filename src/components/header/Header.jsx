import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.css"
import { useRef, useEffect, useState } from "react";
import { searchMovies } from "../../assets/data";

export default function Header({ mode, setMode, setCurrent, inputRef }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Auto-focus search input when on search page
    useEffect(() => {
        if (location.pathname === "/search" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [location.pathname, inputRef]);
    
    // Fetch search suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim().length > 2) {
                const results = await searchMovies(searchQuery);
                setSuggestions(results ? results.slice(0, 5) : []);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };
        
        const timer = setTimeout(() => {
            fetchSuggestions();
        }, 300); // Debounce for 300ms
        
        return () => clearTimeout(timer);
    }, [searchQuery]);
    
    const handleSuggestionClick = async (title) => {
        // Update the input value directly
        if (inputRef.current) {
            inputRef.current.value = title;
            // Force update the searchQuery state
            setSearchQuery(title);
            // Close suggestions
            setShowSuggestions(false);
            // Navigate to search results
            navigate(`/search?q=${encodeURIComponent(title)}`);
            // Force a re-render of the search component
            if (location.pathname === '/search') {
                // If we're already on the search page, force a re-fetch
                const results = await searchMovies(title);
                // The SearchMovies component will handle updating the results
            }
        }
    };
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.length > 2) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };
    
    function handleGenreChange(element) {
        setCurrent(1);
        const value = element.target.value;
        if (value === "all") navigate("/");
        else navigate(`/${value}`);
    }
    
    function handleSearch(e) {
        e.preventDefault();
        const searchValue = inputRef.current?.value.trim();
        if (searchValue) {
            navigate(`/search?q=${encodeURIComponent(searchValue)}`);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }

    return (
        <header className="header-container">
            <div className="header-top">
                <h1>MOVIE EXPLORER</h1>
                <nav>
                    <ul className="nav-list">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                        <li><NavLink to="/top-rated" className={({ isActive }) => isActive ? 'active' : ''}>Top Rated</NavLink></li>
                        <li><NavLink to="/now-playing" className={({ isActive }) => isActive ? 'active' : ''}>Now Playing</NavLink></li>
                        <li><NavLink to="/upcoming" className={({ isActive }) => isActive ? 'active' : ''}>Upcoming</NavLink></li>
                    </ul>
                </nav>
                <button 
                    className="theme-toggle"
                    onClick={() => setMode(mode === "light" ? "dark" : "light")}
                    aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
                >
                    {mode === "light" ? "🌙" : "☀️"}
                </button>
            </div>
            
            <div className="header-bottom">
                <div className="header-bottom-inner">
                    <select 
                        id="genre-select" 
                        name="genre" 
                        onChange={handleGenreChange}
                        aria-label="Filter by genre"
                        defaultValue="all"
                    >
                        <option value="all">All Genres</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="animation">Animation</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="documentary">Documentary</option>
                        <option value="drama">Drama</option>
                        <option value="family">Family</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="history">History</option>
                        <option value="horror">Horror</option>
                        <option value="music">Music</option>
                        <option value="mystery">Mystery</option>
                        <option value="romance">Romance</option>
                        <option value="science-fiction">Science Fiction</option>
                        <option value="tv-movie">TV Movie</option>
                        <option value="thriller">Thriller</option>
                        <option value="war">War</option>
                        <option value="western">Western</option>
                    </select>
                    
                    <div className="search-container">
                        <div className="search-input-container">
                            <input 
                                ref={inputRef} 
                                type="text" 
                                className="search-input" 
                                placeholder="Search movies..." 
                                onKeyDown={handleKeyDown}
                                onChange={handleInputChange}
                                onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                aria-label="Search movies"
                                aria-autocomplete="list"
                                aria-controls="search-suggestions"
                                value={searchQuery}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="suggestions-dropdown" id="search-suggestions" role="listbox">
                                    {suggestions.map((movie) => (
                                        <li 
                                            key={movie.id}
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(movie.title || movie.name)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(movie.title || movie.name)}
                                            role="option"
                                            tabIndex={0}
                                        >
                                            {movie.title || movie.name}
                                            <span className="suggestion-year">
                                                {movie.release_date ? new Date(movie.release_date).getFullYear() : ''}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button 
                            className="search-button" 
                            onClick={handleSearch}
                            aria-label="Search"
                        >
                            <span className="search-icon">🔍</span>
                            <span className="search-text">Search</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}