exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get the API key from environment variables
    const TMDB_API_KEY = process.env.TMDB_API_KEY || 'cfbf330bed072f394c0064b13dcb6f3e';
    
    // Get the endpoint from query parameters
    const { endpoint } = event.queryStringParameters || {};
    
    if (!endpoint) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing endpoint parameter' })
      };
    }

    // Build the TMDB API URL
    const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
    
    // Add API key to the URL
    url.searchParams.append('api_key', TMDB_API_KEY);
    
    // Forward any additional query parameters
    Object.keys(event.queryStringParameters).forEach(key => {
      if (key !== 'endpoint') {
        url.searchParams.append(key, event.queryStringParameters[key]);
      }
    });

    // Make the request to TMDB
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error proxying TMDB request:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch from TMDB',
        message: error.message 
      })
    };
  }
};
