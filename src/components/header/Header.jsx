import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.css"
import { useRef, useEffect, useState, useCallback } from "react";
import { searchMovies } from "../../assets/data";

export default function Header({ mode, setMode, setCurrent, inputRef }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchContainerRef = useRef(null);
    
    // Auto-focus search input when on search page
    useEffect(() => {
        if (location.pathname === "/search" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [location.pathname, inputRef]);
    
    function handleGenreChange(element) {
        setCurrent(1);
        const value = element.target.value;
        if (value === "all") navigate("/");
        else navigate(`/${value}`);
    }
    
    // Debounced search for suggestions
    const fetchSuggestions = useCallback(async (query) => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            return;
        }
        
        try {
            const results = await searchMovies(query);
            // Sort by popularity in descending order and take top 5
            const sortedResults = [...results]
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 5);
            setSuggestions(sortedResults);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    }, []);

    // Handle input change with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions(searchQuery);
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery, fetchSuggestions]);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleSearch(e) {
        e?.preventDefault();
        const searchValue = searchQuery.trim();
        if (searchValue) {
            setShowSuggestions(false);
            navigate(`/search?q=${encodeURIComponent(searchValue)}`);
        }
    }

    function handleSuggestionClick(suggestion) {
        setSearchQuery(suggestion.title);
        setShowSuggestions(false);
        navigate(`/search?q=${encodeURIComponent(suggestion.title)}`);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch(e);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    }

    function handleInputFocus() {
        if (searchQuery.length >= 2) {
            setShowSuggestions(true);
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
                    
                    <div className="search-container" ref={searchContainerRef}>
                        <div className="search-input-container">
                            <input 
                                ref={inputRef} 
                                type="text" 
                                className="search-input" 
                                placeholder="Search movies..." 
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={handleInputFocus}
                                onKeyDown={handleKeyDown}
                                aria-label="Search movies"
                                aria-haspopup="listbox"
                                aria-expanded={showSuggestions && suggestions.length > 0}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="suggestions-dropdown" role="listbox">
                                    {suggestions.map((movie) => (
                                        <li 
                                            key={movie.id}
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(movie)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(movie)}
                                            role="option"
                                            tabIndex={0}
                                        >
                                            <span>{movie.title}</span>
                                            {movie.release_date && (
                                                <span className="suggestion-year">
                                                    {new Date(movie.release_date).getFullYear()}
                                                </span>
                                            )}
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