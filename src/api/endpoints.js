// ✅ Your Base URL (NocodeAPI Spotify endpoint)
const BASE_URL = "https://v1.nocodeapi.com/nehamandoriya2510251/spotify/JkDXeWhzSumjeqGs";

// ✅ Core fetch function with caching
// async function fetchFromSpotify(endpoint, params = {}, cacheKey = null) {
//   const queryString = new URLSearchParams(params).toString();
//   const url = `${BASE_URL}/${endpoint}${queryString ? `?${queryString}` : ""}`;


 function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

 async function fetchFromSpotify(endpoint, params = {}, cacheKey = null) {
  if (!cacheKey) {
    return null; 
  }

  const cached = localStorage.getItem(cacheKey);

  await delay(1000);

  if (cached) {
    console.log("Loaded from cache:", cacheKey);
    return JSON.parse(cached);
  }

 
  console.warn("No cached data found for:", cacheKey);
  return { tracks: { items: [] } };
}

//     // 2. Save response in cache
//     if (cacheKey) {
//       localStorage.setItem(cacheKey, JSON.stringify(data));
//     }

//     return data;
//   } catch (err) {
//     console.error("Spotify API Error:", err);
//     throw err;
//   }
// }



export function searchTracks(query, limit = 10) {
  const cacheKey = `search_${query}_${limit}`;
  return fetchFromSpotify("search", { q: query, type: "track", limit }, cacheKey);
}

export function getTrack(id) {
  return fetchFromSpotify(`tracks/${id}`, {}, `track_${id}`);
}


export function getAlbum(id) {
  return fetchFromSpotify(`albums/${id}`, {}, `album_${id}`);
}


export function getArtist(id) {
  return fetchFromSpotify(`artists/${id}`, {}, `artist_${id}`);
}

export function getRecommendations({ artists = [], tracks = [], genres = [] }) {
  const params = {};
  if (artists.length) params.seed_artists = artists.join(",");
  if (tracks.length) params.seed_tracks = tracks.join(",");
  if (genres.length) params.seed_genres = genres.join(",");

  // Fallback: Arijit Singh
  if (!params.seed_artists && !params.seed_tracks && !params.seed_genres) {
    params.seed_artists = "4YRxDV8wJFPHPTeXepOstw";
  }

  const cacheKey = `recs_${JSON.stringify(params)}`;
  return fetchFromSpotify("recommendations", params, cacheKey);
}


export function getNewReleases(limit = 10) {
  return fetchFromSpotify("browse/new-releases", { limit }, `new_releases_${limit}`);
}

export function getPlaylist(id) {
  return fetchFromSpotify(`playlists/${id}`, {}, `playlist_${id}`);
}


export function getMadeForYou() {
  const playlists = [
    "37i9dQZF1DXbVhgADFy3im",
    "5fy3fbuaU3eIaQgwpPzZaq",
    "t7j2gu61z7vpvey09ih7gop9h"
  ];

  return Promise.all(playlists.map(id => getPlaylist(id)));
}
