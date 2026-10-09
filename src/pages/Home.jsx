import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlbumItems from "../components/AlbumItems";
import Player from "../components/Player";
import NowPlayingView from "../components/NowPlayingView";
import { searchTracks } from "../api/endpoints";
import Loader from "../components/Loader";
import FixedCards from "../components/FixedCards";

function Home({
  searchQuery,
  currentSong,
  isPlaying,
  setCurrentSong,
  setIsPlaying,
  isSidebarOpen,
  isSidebarHovering,
  title,
  songs,
  setSongs,
  playNext,
  playPrev,
  toggleLoop,
  handlePlay,
  isShuffle,
  setIsShuffle,
  history,
  setHistory
}) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);

  const [sections, setSections] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Placeholder cards for loading skeleton
  const placeholderTracks = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    name: "",
    artists: [{ name: "" }],
    album: { images: [{ url: "" }] },
    isPlaceholder: true,
  }));

  // FINAL CORRECTED DEFAULT QUERIES
  const defaultQueries = [
    { title: "Bollywood Hits", query: "bollywood hits" },
    { title: "All Out 00s Hindi", query: "old hindi songs" },
    { title: "Bollywood Hits by Pritam", query: "pritam" },
    { title: "This Is Arijit Singh", query: "arijit singh" }
  ];

  const handleClickShowAll = (title) => {
    navigate(`/show-all/${encodeURIComponent(title)}`);
  };

  useEffect(() => {
    async function fetchHomeSongs() {
      setIsLoading(true);

      const results = {};

      try {
        for (let { title, query } of defaultQueries) {
          const res = await searchTracks(query, 12);
          const tracks = res?.tracks?.items || [];

          results[title] = tracks;
        }

        setSections(results);

        // flatten all songs into one array for player
        const allSongs = Object.values(results).flat();
        setSongs(allSongs);
      } catch (err) {
        console.error("❌ Failed to fetch home data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHomeSongs();

  }, [setSongs]);

  return (
    <div className="bg-black min-h-screen pt-1">
      <div
        className={`bg-black ${
          isSidebarOpen
            ? "px-10 ml-64 w-[calc(100%-16rem)]"
            : "px-8 ml-16 w-[calc(100%-4rem)]"
        } ${isSidebarHovering ? "pointer-events-none overflow-hidden" : ""}`}
      >
        <div
          className="mb-20 flex-col mt-20 rounded-lg transition-all duration-200 
          bg-gradient-to-b from-green-800 via-gray-900 to-gray-900 bg-fixed 
          h-[calc(100vh-5rem)] overflow-y-scroll overflow-x-hidden
  overscroll-y-contain"
        >
          {/* LOADING SKELETON */}
          {isLoading ? (
            <div className="h-screen mb-10">
              {defaultQueries.map(({ title }) => (
                <FixedCards key={title} title={title} tracks={placeholderTracks} />
              ))}
            </div>
          ) : (
            <>
              {/* TOP TABS */}
              <div className="flex flex-row items-start gap-2 p-2">
                <button className="bg-transparent text-white font-bold py-2 rounded-full focus:ring-2 focus:ring-white w-20">
                  All
                </button>
                <button className="bg-transparent text-white font-bold py-2 px-2 rounded-full focus:ring-2 focus:ring-white">
                  Music
                </button>
                <button className="bg-transparent text-white font-bold py-2 px-2 rounded-full focus:ring-2 focus:ring-white">
                  Podcasts
                </button>
              </div>

              {/* RECOMMENDED SECTION */}
              <div className="flex-1 p-4">
                <h1 className="font-bold text-2xl mb-4 text-white">Recommended for You</h1>

                <div className="flex flex-col gap-5">
                  {Object.entries(sections).map(([title, items]) => (
                    <div key={title} className="p-4">
                      <div className="w-full flex items-center justify-between">
                        <h1 className="font-bold text-2xl mb-4 text-white">{title}</h1>

                        <button
                          onClick={() => handleClickShowAll(title)}
                          className="text-green-400 font-semibold text-sm hover:underline whitespace-nowrap"
                        >
                          Show All
                        </button>
                      </div>

                      <div className="flex items-stretch gap-4 overflow-x-auto overflow-y-hidden pb-12 scrollbar-hide">
                        {items.length > 0 ? (
                          items.slice(0, 10).map((song, index) => (
                            <AlbumItems
                              key={song.id}
                              name={song.name}
                              desc={song.artists?.map((a) => a.name).join(", ")}
                              image={song.album?.images?.[0]?.url}
                              song={song}
                              onPlay={() => handlePlay(song, index)}
                              currentSong={currentSong}
                              isPlaying={isPlaying}
                            />
                          ))
                        ) : (
                          <p className="text-white">No songs found</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* PLAYER COMPONENT */}
          <Player
            songs={songs}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            currentSong={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playNext={playNext}
            playPrev={playPrev}
            showNowPlaying={showNowPlaying}
            setShowNowPlaying={setShowNowPlaying}
            toggleLoop={toggleLoop}
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
            history={history}
            setHistory={setHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
