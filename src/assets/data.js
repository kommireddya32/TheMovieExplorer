// Helper function to build proxy URL
const buildProxyUrl = (endpoint, params = {}) => {
    const url = new URL('/.netlify/functions/tmdb-proxy', window.location.origin);
    url.searchParams.append('endpoint', endpoint);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });
    return url.toString();
};

export async function getTrendngMovies(page=1) {
    let data=[];
    try{
        let response = await fetch(buildProxyUrl('/movie/popular', { page }));
        data = await response.json();
        return data.results;
    }
    catch{
        console.log("Error fetching movies");
        data=[];
        return data;
    }
    
}


export async function getUpcomingMovies(page=1) {
    let data=[];
    try{
        const today = new Date().toISOString().split("T")[0];

        let response = await fetch(buildProxyUrl('/discover/movie', {
            page,
            'sort_by': 'primary_release_date.asc',
            'primary_release_date.gte': today,
            'vote_count.gte': 0,
            'language': 'en-US'
        }));
        data = await response.json();
        console.log(data);
        return data.results;
    }
    catch{
        console.log("Error fetching movies");
        data=[];
        return data;
    }
    
}
export async function getTopRatedMovies(page=1) {
    let data=[];
    try{
        let response = await fetch(buildProxyUrl('/movie/top_rated', { page }));
        data = await response.json();
        return data.results;
    }
    catch{
        console.log("Error fetching movies");
        data=[];
        return data;
    }
    
}

export async function getNowPlayingMovies(page=1) {
    let data = [];
    try {
        let response = await fetch(buildProxyUrl('/movie/now_playing', {
            page,
            region: 'FR',
            language: 'fr-FR'
        }));
        
        if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        data = await response.json();
        return data.results;
    }
    catch(error) { 
        console.log("Error fetching now playing movies:", error);
        return [];
    }
}

export async function getGenre(genreId=28,page=1) {

    let data=[];
    try{
        let response = await fetch(buildProxyUrl('/discover/movie', {
            with_genres: genreId,
            page
        }));
        data = await response.json();
        return data.results;
    }
    catch{
        console.log("Error fetching movies");
        data=[];
        return data;
    }
}
export async function searchMovies(searchterm){
    let data;
    try{
        let response = await fetch(buildProxyUrl('/search/movie', { query: searchterm }));
        let d = await response.json();
        data=d.results;
    }
    catch(error){
        console.log(`Error fetching movies: ${error}`);
        data=[];
    }
    return data;
}

export async function getMovieProviders(movieId, region = 'US') {
    try {
        const response = await fetch(buildProxyUrl(`/movie/${movieId}/watch/providers`));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // If specific region was requested and not found, return empty results
        if (region && !data.results[region]) {
            return { results: {} };
        }
        
        // If specific region was requested, only return that region's data
        if (region) {
            return {
                results: {
                    [region]: data.results[region] || {}
                }
            };
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching movie providers:', error);
        return { results: {} };
    }
}

export async function getMovieDetails(movieId) {
    try {
        const response = await fetch(buildProxyUrl(`/movie/${movieId}`));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

export async function getMovieCredits(movieId) {
    try {
        const response = await fetch(buildProxyUrl(`/movie/${movieId}/credits`));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie credits:', error);
        throw error;
    }
}

export async function getMovieVideos(movieId) {
    try {
        const response = await fetch(buildProxyUrl(`/movie/${movieId}/videos`));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie videos:', error);
        return { results: [] }; // Return empty results on error
    }
}
