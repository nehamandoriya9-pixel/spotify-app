import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ShowAll from "./pages/ShowAll";
import Player from "./components/Player";
import './index.css';
import Contentfeed from "./components/Contentfeed";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { albumsData } from "./assets/assets";
import NowPlayingView from "./components/NowPlayingView";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import { Outlet } from 'react-router-dom'
import SearchPage from "./pages/SearchPage";


function App(off) {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarHovering, setIsSidebarHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loopMode, setLoopMode] = useState(off);
  const [isShuffle, setIsShuffle] = useState(false);
  const [history, setHistory] = useState([]);



  // const getTracks = () => {
  //   let data = fetch("https://v1.nocodeapi.com/nehamandoriya1510151/spotify/bATJhPuDRHqjDUQt/search?q=daku&type=track")
  //   let convertedData = data.json()
  //   console.log(convertedData)
  // }
  const handlePlay = (track, index = null) => {
    if (currentSong?.id === track.id) {
      setIsPlaying((prev) => !prev);
    } else {
      setIsLoading(true);
      setCurrentIndex(index);
      setCurrentSong(track);

      // console.log(currentSong)
      setIsPlaying(true);


      // setTimeout(() => {
      //   setIsPlaying(true);
      //   setIsLoading(false);
      // }, 1000)
    }
  };
  const toggleLoop = () => {
    setLoopMode((prev) => {
      console.log("Previous loop mode:", prev)
      if (prev === "off") return "all"
      if (prev === "all") return "one"
      return "off"

    });

  }

  const playNext = () => {
    if (!songs || songs.length === 0 || currentIndex === null) return;

    if (isShuffle) {
      setHistory((prev) => [ ...prev, currentIndex]);

      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * songs.length)
console.log(isShuffle)
      } while (nextIndex === currentIndex);
      console.log(isShuffle)
      setCurrentIndex(nextIndex);
      setCurrentSong(songs[nextIndex]);
      setIsPlaying(true);
      return;
    }

    let nextIndex = currentIndex + 1;

    if (nextIndex >= songs.length) {
      // wrap only if loopMode === "all"
      if (loopMode === "all") {
        nextIndex = 0;
      } else {
        setIsPlaying(false); // stop playback
        return;
      }
    }

    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (!songs || songs.length === 0 || currentIndex === null) return;

    if (isShuffle && history.length > 0) {

      const prevHistory = [...history];
      const lastIndex = prevHistory.pop();
      setHistory(prevHistory);

      setCurrentIndex(lastIndex);
      setCurrentSong(songs[lastIndex]);
      setIsPlaying(true);
      return;
    }
    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      // wrap only if loopMode === "all"
      if (loopMode === "all") {
        prevIndex = songs.length - 1;
      } else {
        setIsPlaying(false); // stop playback
        return;
      }
    }

    setCurrentIndex(prevIndex);
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };



  return (
    <div className=" bg-black text-white flex flex-col  ">
      {/* 
      <div className="flex-1 overflow-y-auto"> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<ProtectedRoute>
          <Layout>

            <div
              className={`flex-1  mb-24 flex flex-col  mt-20  ml-24 rounded-lg transition-all duration-300  bg-gradient-to- from-green-800 via-gray-900 to-gray-900  overflow-auto overflow-y-scroll
  ${isSidebarOpen ? "ml-72 w-[calc(100%-16rem)]" : "ml-16 w-[calc(100%-4rem)]"}`}
            >
              <Outlet />
            </div>
          </Layout>
        </ProtectedRoute>}>

          <Route
            index
            element={

              <Home
                searchQuery={searchQuery}
                handlePlay={handlePlay}
                currentSong={currentSong}
                isPlaying={isPlaying}
                setCurrentSong={setCurrentSong}
                setIsPlaying={setIsPlaying}
                currentIndex={currentIndex}
                showNowPlaying={showNowPlaying}
                setShowNowPlaying={setShowNowPlaying}
                isSidebarOpen={isSidebarOpen}
                isSidebarHovering={isSidebarHovering}
                songs={songs}
                setSongs={setSongs}
              />

            }
          />
          <Route
            path="show-all/:category"
            element={
              <ShowAll
                handlePlay={handlePlay}
                isPlaying={isPlaying}
                currentSong={currentSong}
                currentIndex={currentIndex}
              />
            }
          />
          <Route path="content-feed" element={<Contentfeed />} />
          <Route path="/search/:query" element={<SearchPage
            onPlay={handlePlay}
            currentSong={currentSong}
            isPlaying={isPlaying}
            showNowPlaying={showNowPlaying}
            setShowNowPlaying={setShowNowPlaying} />} />
        </Route>
      </Routes>
      {/* </div> */}


      {isAuthenticated && (
        <>
          <div className='flex bg-black max-h-screen  text-white '>
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setIsSidebarHovering={setIsSidebarHovering} />
          </div>
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />



          <NowPlayingView
            currentSong={currentSong}
            isPlaying={isPlaying}
            showNowPlaying={showNowPlaying}
            setShowNowPlaying={setShowNowPlaying}
          />
          <Player
            songs={songs}
            setSongs={setSongs}
            currentSong={currentSong}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playNext={playNext}
            playPrev={playPrev}
            showNowPlaying={showNowPlaying}
            setShowNowPlaying={setShowNowPlaying}
            toggleLoop={toggleLoop}
            loopMode={loopMode}
            setLoopMode={setLoopMode}
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
            history={history}
            setHistory={setHistory}

          />
        </>
      )}
    </div>

  );
}

export default App;
