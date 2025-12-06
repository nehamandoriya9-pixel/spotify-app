// ✅ Base URL for NocodeAPI Spotify endpoint
const BASE_URL = "https://v1.nocodeapi.com/khushi9893071/spotify/mPbTHLLzmFZPrCky";

// ✅ Utility: delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ✅ Core fetch function with caching
async function fetchFromSpotify(endpoint, params = {}, cacheKey = null) {
  if (!cacheKey) return null;

  // Build query string with proper encoding
  const queryParts = [];
  Object.keys(params).forEach(key => {
    const value = params[key];
    // Keep commas in seed lists (artists, tracks, genres)
    if (typeof value === "string" && value.includes(",")) {
      queryParts.push(`${key}=${value}`);
    } else {
      queryParts.push(`${key}=${encodeURIComponent(value)}`);
    }
  });

  const queryString = queryParts.join("&");
  const url = `${BASE_URL}/${endpoint}${queryString ? `?${queryString}` : ""}`;

  console.log("Fetching from Spotify:", url);

  // Check cache
  const cached = localStorage.getItem(cacheKey);
  await delay(300); // small delay to avoid overwhelming API

  if (cached) {
    console.log("Loaded from cache:", cacheKey);
    return JSON.parse(cached);
  }

  console.warn("No cached data found for:", cacheKey);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();

    // Only cache if the response has real track data
    if (data && Object.keys(data).length > 0) {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } else {
      console.warn("Empty response, not caching:", cacheKey);
    }

    return data;
  } catch (err) {
    console.error("Spotify API fetch error:", err);
    return { tracks: { items: [] } }; // fallback empty response
  }
}

// ✅ Search tracks
export function searchTracks(query, limit = 10) {
  const cacheKey = `search_${query}_${limit}`;
  return fetchFromSpotify(
    "search",
    {  q: query ,
 type: "track", limit },
    cacheKey
  );
}

// ✅ Get a single track
export function getTrack(id) {
  return fetchFromSpotify(`tracks/${id}`, {}, `track_${id}`);
}

// ✅ Get an album
export function getAlbum(id) {
  return fetchFromSpotify(`albums/${id}`, {}, `album_${id}`);
}

// ✅ Get an artist
export function getArtist(id) {
  return fetchFromSpotify(`artists/${id}`, {}, `artist_${id}`);
}

// ✅ Get recommendations
export async function getRecommendations({ artists = [], tracks = [], genres = [] }) {
  const params = {};
  if (artists.length) params.seed_artists = artists.join(",");
  if (tracks.length) params.seed_tracks = tracks.join(",");
  if (genres.length) params.seed_genres = genres.join(",");

  if (!params.seed_artists && !params.seed_tracks && !params.seed_genres) {
    params.seed_artists = "4YRxDV8wJFPHPTeXepOstw"; // Arijit Singh
  }

  const cacheKey = `recs_${params.seed_artists || ""}_${params.seed_tracks || ""}_${params.seed_genres || ""}`;

  const data = await fetchFromSpotify("recommendations", params, cacheKey);
  return data?.tracks?.items || [];
}


// ✅ Get new releases
export function getNewReleases(limit = 10) {
  return fetchFromSpotify("browse/new-releases", { limit }, `new_releases_${limit}`);
}

// ✅ Get a playlist
export function getPlaylist(id) {
  return fetchFromSpotify(`playlists/${id}`, {}, `playlist_${id}`);
}

// ✅ Get "Made For You" playlists
export function getMadeForYou() {
  const playlists = [
    "37i9dQZF1DXbVhgADFy3im",
    "5fy3fbuaU3eIaQgwpPzZaq",
    "t7j2gu61z7vpvey09ih7gop9h"
  ];

  return Promise.all(playlists.map(id => getPlaylist(id)));
}
