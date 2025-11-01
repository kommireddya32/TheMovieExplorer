import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieVideos, getMovieProviders } from '../../assets/data';
import './AboutMovieCard.css';

// Platform logos mapping with just emojis
const platformLogos = {
  'Netflix': '🎬',
  'Amazon Prime Video': '🎥',
  'Disney Plus': '🏰',
  'HBO Max': '📺',
  'Hulu': '🍿',
  'Apple TV Plus': '🍎',
  'Paramount Plus': '🎞️',
  'Peacock': '🦚',
  'Hotstar': '🔥',
  'Zee5': '📺',
  'Voot': '▶️',
  'SonyLIV': '🎭',
  'MUBI': '🎥',
  'YouTube': '▶️',
  'Google Play Movies': '▶️',
  'YouTube Premium': '▶️',
  'Apple TV': '🍎',
  'Amazon Video': '🛒',
  'Vudu': '🎬',
  'Microsoft Store': '🪟',
  'AMC+': '📺',
  'fuboTV': '📺',
  'DIRECTV': '📡',
  'AMC on Demand': '🎭',
  'CBS': '📺',
  'The Roku Channel': '📺',
  'PBS': '📺',
  'Popcornflix': '🍿',
  'Tubi TV': '📺',
  'Crackle': '📺',
  'Pluto TV': '🪐',
  'IMDb TV': '📺',
  'Peacock Premium': '🦚',
  'Starz': '⭐',
  'Starz Play Amazon Channel': '⭐',
  'Showtime': '🎭',
  'Showtime Amazon Channel': '🎭',
  'HBO Max Amazon Channel': '📺',
  'HBO': '📺',
  'HBO Now': '📺',
  'HBO Go': '📺',
  'Max': '📺',
  'Max Amazon Channel': '📺',
  'Crunchyroll': '🍥',
  'Funimation Now': '🎌',
  'Netflix basic with Ads': '🎬',
  'Netflix Kids': '🎬',
  'Netflix with Ads': '🎬'
};

// Fallback for unknown providers
const defaultPlatform = '🎬';

export default function AboutMovieCard({ mode = 'light', setMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [providers, setProviders] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get movie details, credits, and videos in parallel
        const [details, movieCredits, movieVideos] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id)
        ]);
        
        // Get providers for India only
        const providersIN = await getMovieProviders(id, 'IN');
        
        const getAvailableProviders = () => {
          const inProviders = providersIN.results.IN || {};
          
          // Get all provider types (flatrate, rent, buy) for India
          const flatrate = inProviders.flatrate || [];
          const rent = inProviders.rent || [];
          const buy = inProviders.buy || [];
          
          // Combine all providers and remove duplicates by provider_id
          const allProviders = [...flatrate, ...rent, ...buy];
          const uniqueProviders = [];
          const providerIds = new Set();
          
          allProviders.forEach(provider => {
            if (provider && provider.provider_id && !providerIds.has(provider.provider_id)) {
              providerIds.add(provider.provider_id);
              uniqueProviders.push(provider);
            }
          });
          
          return uniqueProviders;
        };
        
        const providersData = getAvailableProviders();
        
        setMovie(details);
        setCredits(movieCredits);
        setVideos(movieVideos.results || []);
        setProviders(providersData);
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleOTTPlatformClick = (url) => {
    window.open(url, '_blank');
  };

  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  if (loading) return <div className={`loading ${mode}`}>Loading movie details...</div>;
  if (error) return <div className={`error ${mode}`}>{error}</div>;
  if (!movie) return <div className={`not-found ${mode}`}>Movie not found</div>;

  return (
    <div className={mode}>
      {/* Theme Toggle Button - Fixed Top Right */}
      {setMode && (
        <button 
          className="theme-toggle-btn-fixed"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {mode === "light" ? "🌙" : "☀️"}
        </button>
      )}
      
      <div className="about-movie-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>← Back to Movies</button>
      
      {/* Movie Header */}
      <div className="movie-header">
        <div className="movie-poster">
          {movie.poster_path ? (
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div class="no-poster">
                  <div class="no-poster-icon">🎬</div>
                  <p>No Poster Available</p>
                </div>`;
              }}
            />
          ) : (
            <div className="no-poster">
              <div className="no-poster-icon">🎬</div>
              <p>No Poster Available</p>
            </div>
          )}
        </div>
        
        <div className="movie-info">
          <h1>
            {movie.title} 
            {movie.release_date && <span>({new Date(movie.release_date).getFullYear()})</span>}
          </h1>
          
          <div className="movie-meta">
            <span className="rating">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}/10</span>
            {movie.runtime && <span>{movie.runtime} min</span>}
            {movie.release_date && <span>{movie.release_date}</span>}
          </div>
          
          <div className="genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          
          <p className="overview">{movie.overview}</p>
          
          {trailer && (
            <div className="trailer-section">
              <button 
                className="trailer-button" 
                onClick={() => setShowTrailer(!showTrailer)}
              >
                {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
              </button>
              
              {showTrailer && (
                <div className="trailer-container">
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`${movie.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Available On Section */}
      <div className="ott-section">
        <h2>Available On</h2>
        <div className="ott-platforms">
          {providers && Array.isArray(providers) && providers.length > 0 ? (
            providers.map((provider) => {
              const platform = platformLogos[provider.provider_name] || defaultPlatform;
              const emoji = platformLogos[provider.provider_name] || defaultPlatform;
              return (
                <div
                  key={provider.provider_id}
                  className="ott-platform"
                  title={provider.provider_name}
                >
                  <span className="ott-emoji">{emoji}</span>
                  <span className="ott-name">{provider.provider_name}</span>
                </div>
              );
            })
          ) : (
            <p>No streaming providers found for this movie in your region.</p>
          )}
        </div>
      </div>
      
      {/* Top Cast Section */}
      <div className="cast-section">
        <h2>Top Cast</h2>
        <div className="cast-grid">
          {credits?.cast?.slice(0, 10).map(actor => (
            <div key={actor.id} className="cast-member">
              {actor.profile_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="cast-photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector('.cast-info').insertAdjacentHTML('beforebegin', 
                      '<div class="no-photo">👤</div>');
                  }}
                />
              ) : (
                <div className="no-photo">👤</div>
              )}
              <div className="cast-info">
                <h4>{actor.name}</h4>
                <p className="character">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}