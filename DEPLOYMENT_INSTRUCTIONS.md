# Deployment Instructions for Netlify

## Problem Solved
TMDB API is blocked in India when called directly from the browser. This solution uses a Netlify serverless function to proxy all API requests server-side, bypassing the restriction.

## Files Created/Modified

### New Files:
1. **netlify/functions/tmdb-proxy.js** - Serverless function that proxies TMDB API requests
2. **netlify.toml** - Netlify configuration file
3. **public/_redirects** - SPA routing configuration

### Modified Files:
1. **src/assets/data.js** - Updated all API calls to use the proxy function

## Deployment Steps

### 1. Set Environment Variable in Netlify (Optional but Recommended)

Your TMDB API key is currently hardcoded in the serverless function. For better security:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add a new variable:
   - **Key**: `TMDB_API_KEY`
   - **Value**: `cfbf330bed072f394c0064b13dcb6f3e`

If you don't set this, the function will use the hardcoded fallback key.

### 2. Deploy to Netlify

#### Option A: Via Netlify CLI
```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

#### Option B: Via Git (Recommended)
1. Push your changes to GitHub/GitLab/Bitbucket
2. Netlify will automatically detect the changes and deploy
3. The `netlify.toml` file will configure the build automatically

#### Option C: Manual Deploy via Netlify Dashboard
1. Build your project: `npm run build`
2. Go to Netlify dashboard
3. Drag and drop the `dist` folder

### 3. Verify Deployment

After deployment, test these endpoints:
- Home page (popular movies)
- Top Rated
- Now Playing
- Upcoming
- Genre filtering
- Search functionality

All API calls now go through `/.netlify/functions/tmdb-proxy` which works from India.

## How It Works

1. **Before**: Browser → TMDB API (blocked in India) ❌
2. **After**: Browser → Netlify Function → TMDB API → Netlify Function → Browser ✅

The serverless function runs on Netlify's servers (not in India), so it can access TMDB API without restrictions.

## Testing Locally

To test the serverless function locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server with functions
netlify dev
```

This will start both your Vite dev server and the Netlify functions locally.

## Troubleshooting

### If API calls still fail:
1. Check browser console for errors
2. Verify the serverless function is deployed (check Netlify Functions tab)
3. Ensure environment variable is set correctly
4. Check Netlify function logs for errors

### If build fails:
1. Ensure `netlify.toml` is in the root directory
2. Verify `dist` folder is created after `npm run build`
3. Check build logs in Netlify dashboard
