import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchTracks } from "../api/endpoints";
import { FaPlay, FaPause } from "react-icons/fa";




function SearchPage({ onPlay, currentSong, isPlaying }) {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [hoveredTrackId, setHoveredTrackId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        searchTracks(query, 12)
          .then((data) => setResults(data.tracks?.items || []))
          .catch((err) => console.error("Search failed:", err));
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);


  return (
    <div className="bg-[#1E1E1E] p-4 mb-24 mt-24 px-24 rounded relative overflow-y-auto h-screen">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-4 gap-4">
        {results.map((track) => {
          const isCurrent = currentSong?.id === track.id;
          const isHovered = hoveredTrackId === track.id;

          return (
            <div
              key={track.id}
              className="bg-[#1e1e1e] p-4 rounded-lg relative"
              onMouseEnter={() => setHoveredTrackId(track.id)}
              onMouseLeave={() => setHoveredTrackId(null)}
            >
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="rounded mb-2"
              />
              <h3 className="font-semibold">{track.name}</h3>
              <p className="text-sm text-gray-400">{track.artists[0].name}</p>

              {isHovered && (
                <button
                  onClick={() => onPlay(track)}
                  className="absolute bottom-4 right-4 bg-green-600 p-2 rounded-full shadow-lg " disabled={isLoading}
                >
                  {isCurrent && isLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div> // spinner
                  ) : isCurrent && isPlaying ? (
                    <FaPause className="text-white h-5 w-5" />
                  ) : (
                    <FaPlay className="text-white h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SearchPage;