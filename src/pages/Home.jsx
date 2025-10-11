import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlbumItems from "../components/AlbumItems";
import { albumsData, chartData } from "../assets/assets";
// import Chart from "../components/Chart";
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
  isSidebarHovering, title, songs, setSongs, playNext, playPrev, toggleLoop, handlePlay, isShuffle, setIsShuffle, history, setHistory
}) {
  // const [songs, setSongs] = useState([]);
  //   const [madeForYou, setMadeForYou] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [sections, setSections] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const placeholderTracks = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    name: "",
    artists: [{ name: "" }],
    album: { images: [{ url: "" }] },
    isPlaceholder: true,
  }));
console.log(placeholderTracks)
  const defaultQueries = [
    { title: "Bollywood Hits", query: "bollywood" },
    { title: "All Out 00s Hindi", query: "shreya ghoshal" },
    { title: "Bollywood hits by pritam", query: "Pritam" },
    { title: "This Is Arijit singh", query: "Arijit Singh" }
  ];
  const handleClickShowAll = (title) => {
    navigate(`/show-all/${encodeURIComponent(title)}`);
  };

  // const handlePlay = (song) => {
  //   const index = songs.findIndex((s) => s.id === song.id); // find index in flattened array
  //   if (currentSong?.id === song.id) {
  //     setIsPlaying((prev) => !prev);
  //   } else {
  //     setCurrentIndex(index);
  //     setCurrentSong(song);
  //     setIsPlaying(true);
  //   }
  // };

  // const playNext = () => {
  //   if (songs.length === 0) return;
  //   setCurrentIndex((prev) => {
  //     const nextIndex = (prev + 1) % songs.length;
  //     setCurrentSong(songs[nextIndex]);
  //     return nextIndex;
  //   });
  //   setIsPlaying(true);
  // };

  // const playPrev = () => {
  //   if (songs.length === 0) return;
  //   setCurrentIndex((prev) => {
  //     const prevIndex = prev === 0 ? songs.length - 1 : prev - 1;
  //     setCurrentSong(songs[prevIndex]);
  //     return prevIndex;
  //   });
  //   setIsPlaying(true);
  // };

  // const toggleLoop = () => {
  //   setLoopMode((prev) => {
  //     console.log("Previous loop mode:", prev)
  //     if (prev === "off") return "all"
  //     if (prev === "all") return "one"
  //     return "off"

  //   });

  // }

  useEffect(() => {
    async function fetchData() {
      const results = {};
      setIsLoading(true);
console.log(isLoading)
      try {
        for (let { title, query } of defaultQueries) {
          const data = await searchTracks(query, 10);
          results[title] = data?.tracks?.items || [];
        }
        setSections(results);

        const allSongs = Object.values(results).flat();
        setSongs(allSongs);
      } catch (err) {
        console.error("Failed to load:", err);
      } finally {
        setIsLoading(false);
console.log(isLoading)

      }
    }
    fetchData();
  }, [setSongs]);

  console.log(isLoading)
  return (
    <div className=" bg-black min-h-screen">
      <div
        className={` bg-black   ${isSidebarOpen
          ? "px-10 ml-64 w-[calc(100%-16rem)] "
          : "px-8 ml-16 w-[calc(100%-4rem)]"
          } ${isSidebarHovering ? "pointer-events-none overflow-hidden" : ""} `}
      >
        <div
          className={`mb-20 flex-col mt-20 rounded-lg transition-all  duration-200 bg-gradient-to-b from-green-800 via-gray-900 to-gray-900 bg-fixed h-[calc(100vh-5rem)] overflow-y-scroll overflow-x-scroll`}
        >
          {isLoading ? (
            <>
            {/* <Loader /> */}
          <div className="h-screen mb-10" >
            {defaultQueries.map(({ title }) => (
                <FixedCards key={title} title={title} tracks={placeholderTracks} />
              ))}
              </div>
              </>
          ) : (
            <>
            

              {/* Tabs */}
              <div className="flex flex-row items-start gap-2 ">
                <button className="flex items-center justify-center bg-transparent text-white font-bold py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-20">
                  All
                </button>
                <button className="flex items-center justify-center bg-transparent text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                  Music
                </button>
                <button className="flex items-center justify-center bg-transparent text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                  Podcasts
                </button>
              </div>

              {/* Recommended Songs */}
              <div className="flex-1 p-4">
                <h1 className="font-bold w-full text-2xl mb-4">Recommended for You</h1>
                {/* <button
            onClick={() => handleClickShowAll(title, title)}
            className="font-semibold relative left-[90%] py-1 px-2"
          >
            Show all
          </button> */}


                <div className="flex flex-col gap-5 ">
                 
                  {Object.entries(sections).map(([title, songs]) => (

                    <div key={title} className="p-4">
                      <div className="w-full flex items-center justify-between ">
                        <h1 className="font-bold text-2xl mb-4  text-white">{title}</h1>
                        <button
                          onClick={() => handleClickShowAll(title)}
                          className="font-semibold text-sm text-green-400 hover:underline  justify-end items-end whitespace-nowrap "
                        >
                          Show All
                        </button>
                      </div>
                     
                      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
                        {songs.length > 0 ? (
                          songs.slice(0, 10).map((item, index) => (
                            <AlbumItems
                              key={item.id}
                              name={item.name}
                              desc={item.artists?.map((a) => a.name).join(", ")}
                              image={item.album?.images?.[0]?.url}
                              song={item}
                              onPlay={() => handlePlay(item, index)}
                              currentSong={currentSong}
                              isPlaying={isPlaying}
                            />
                          ))
                          
                        ) : (
                          <p className="text-white">No songs found</p>
                        )}
                      </div>
                       {/* <FixedCards title={title} tracks={songs}/> */}
                    </div>

                  ))}
                </div>
              </div>
            </>
          )}
          {/* Charts */}
          {/* <div className="flex flex-row gap-2">
          <div className="flex-1 overflow-x-auto p-4">
            <h1 className="font-bold text-2xl mb-4">Chart</h1>
            <button
              onClick={handleClickShowAll}
              className="font-semibold relative left-[90%] py-1 px-2"
            >
              Show all
            </button> */}

          {/* <div className="text-white flex space-x-4 scrollbar-hide">
              {chartData.map((item, index) => (
                <Chart
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  image={item.image}
                />
              ))}
            </div> */}
          {/* </div>
        </div> */}

          {/* Player */}
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
    // </div>
  );
}

export default Home;
