export async function getTrendngMovies(page=1) {
    let data=[];
    try{
        let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cfbf330bed072f394c0064b13dcb6f3e&page=${page}`);
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

        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=cfbf330bed072f394c0064b13dcb6f3e&sort_by=primary_release_date.asc&primary_release_date.gte=${today}&vote_count.gte=0&language=en-US&page=${page}`
);
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
        let response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=cfbf330bed072f394c0064b13dcb6f3e&page=${page}`);
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
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=cfbf330bed072f394c0064b13dcb6f3e&region=FR&language=fr-FR&page=${page}`;
        
        let response = await fetch(url);
        
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
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=cfbf330bed072f394c0064b13dcb6f3e&with_genres=${genreId}&page=${page}`);
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
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cfbf330bed072f394c0064b13dcb6f3e&query=${searchterm}`);
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
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=cfbf330bed072f394c0064b13dcb6f3e`
        );
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
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=cfbf330bed072f394c0064b13dcb6f3e`
        );
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
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=cfbf330bed072f394c0064b13dcb6f3e`
        );
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
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=cfbf330bed072f394c0064b13dcb6f3e`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie videos:', error);
        return { results: [] }; // Return empty results on error
    }
}
