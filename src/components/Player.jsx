import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause, FaRetweet } from "react-icons/fa";
import { ImShuffle } from "react-icons/im";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { TfiLoop } from "react-icons/tfi";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { TiDevicePhone } from "react-icons/ti";
import { MdVolumeUp } from "react-icons/md";
import { MdVolumeOff } from "react-icons/md";


function Player({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  setShowNowPlaying,
  showNowPlaying,
  currentIndex,
  setCurrentIndex,
  handlePlay,
  playNext,
  playPrev,
  toggleLoop,
  loopMode, loop, isShuffle, setIsShuffle
}) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerHovering, setIsPlayerHovering] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [volume, setVolume] = useState(0);
  const [isMuted, setIsMuted] = useState();

  const audioRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newTime = Math.floor(percentage * duration);
    setHoverTime(newTime);
  };


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(Math.floor(audio.duration || 0));
      setProgress(Math.floor(audio.currentTime || 0))
    }
    const onTime = () => setProgress(audio.currentTime);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, [currentSong]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.pause();
    audio.currentTime = 0
    setProgress(0);

    audio.src = currentSong.preview_url || "";
    audio.load();

    if (isPlaying) {
      audio.play().catch((err) => console.log("Play error:", err));
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => { });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = (loop === "one")
  }, [loopMode])

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted])

  // const handleAudioEnded = () => {
  //   const audio = audioRef.current;
  //   if (!audio) return;

  //   if (loopMode === "one") {
  //     audio.currentTime = 0;
  //     if (isPlaying) audio.play().catch(() => { })
  //   } else {

  //     playNext();
  //   }
  // }
  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const handlePlayPause = () => {
    if (!currentSong) return;
    setIsPlaying((prev) => !prev);
  };
  const toggleMute = () => setIsMuted(!isMuted)
  console.log(toggleMute)

  // const handleVolumeChange = (newVol) => {
  //   if (isMuted && newVol > 0) setIsMuted(false);
  //   setVolume(newVol);
  // };
  const formatTime = (s) => {
    if (!s || Number.isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 px-4 py-3 text-white flex h-25 ">
      <div className="flex items-center gap-30">

        {currentSong?.album?.images?.[0]?.url && (
          <div className="flex items-center gap-4">
            <img
              src={currentSong.album.images[0].url}
              alt={currentSong.name}
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="font-bold">{currentSong.name || "No song playing"}</p>
              <p className="text-sm text-gray-400 max-w-2xs h-6 flex overflow-y-clip overflow-auto">
                {currentSong?.artists?.map((a) => a.name).join(", ")}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center pl-100 h-28 fixed">
          {/* Controls */}
          <div className="flex items-center gap-4 px-55 h-10">
            <ImShuffle className={`font-bold h-5 w-5 mt-8 ${isShuffle ? "text-green-400" : ""}`}
              onClick={() => setIsShuffle(!isShuffle)} />

            <MdOutlineSkipPrevious
              className="font-bold h-5 w-5 mt-8 cursor-pointer"
              onClick={playPrev}
            />

            <button
              onClick={handlePlayPause}
              className="bg-gray-800 p-2 rounded-full hover:bg-gray-800 mt-9"
              disabled={!currentSong}
            >
              {isPlaying ? (
                <FaPause className="text-white h-5 w-5" />
              ) : (
                <FaPlay className="text-white h-5 w-5" />
              )}
            </button>

            <MdOutlineSkipNext
              className="font-bold h-5 w-5 mt-8 cursor-pointer"
              onClick={playNext}
            />

            <button onClick={toggleLoop}>
              <TfiLoop
                className={`font-bold h-5 w-5 mt-8
                ${loopMode === "all" ? "text-green-400" : ""}
                ${loopMode === "one" ? "text-green-400" : ""}`}
              />
              {loopMode === "one" && (
                <span className="absolute text-xs font-bold">1</span>
              )}
            </button>

            <div className="px-72 flex flex-row gap-3">
              {currentSong && (
                <button onClick={() => setShowNowPlaying(!showNowPlaying)}>
                  <AiOutlinePlaySquare className="font-bold h-5 w-5 mt-10" />
                </button>
              )}
              <TbMicrophone2 className="font-black h-5 w-5 mt-10" />
              <HiOutlineQueueList className="font-black h-5 w-5 mt-10" />
              <TiDevicePhone className="font-black h-5 w-5 mt-10" />

              <div className="flex items-center gap-2 mt-10 h-5 w-5 ">
                <button onClick={toggleMute}>
                  {isMuted || volume === 0 ? <MdVolumeOff /> : <MdVolumeUp />}
                </button>
                <div className="w-24 h-1 bg-gray-700 rounded relative group">
                   <div className="absolute top-0 left-0 h-full rounded"
                    style={{ width: `${volume * 100}%`, backgroundColor: '#1DB954' }} /> 
                    <input 
                    type="range" 
                    min="0" 
                    max="1"
                     step="0.01" 
                     value={volume} 
                     onChange={(e) => setVolume(Number(e.target.value))} 
                     className="absolute top-0 left-0 w-24 h-1 cursor-pointer appearance-none bg-amber-50" />
                      </div> 
                     </div>
                
               
              
            </div>
          </div>

          <div
            className="flex justify-center items-center gap-4 w-[600px] mt-4 relative"
            onMouseEnter={() => setIsPlayerHovering(true)}
            onMouseLeave={() => setIsPlayerHovering(false)}
          >
            <span className="text-[11px] text-gray-600 min-w-[38px] text-right">
              {formatTime(progress)}
            </span>

            <div className="relative w-full">
              <div className="relative w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-green-400"
                  style={{ width: `${(progress / duration) * 100}% ` }}
                />
              </div>

              <div
                className={`absolute inset-0 flex items-center transition-all duration-300 ${isPlayerHovering ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {isHovering && (
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-gray-900 rounded-full pointer-events-none"
                    style={{
                      width: `${(hoverTime / duration) * 100}%`,
                      transform: "translateY(-50%)",
                      opacity: 0.5,
                      backgroundColor: '#1DB954'
                    }}
                  />
                )}

                <div
                  className="absolute top-1/2 left-0 h-1 bg-green-400 text-white rounded-full pointer-events-none"
                  style={{
                    width: `${(progress / duration) * 100}%`,
                    transform: "translateY(-50%)",
                  }}
                />

                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={progress}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="w-full h-1 cursor-pointer appearance-none bg-transparent relative z-10"
                />

                {isHovering && hoverTime !== null && (
                  <div
                    className="absolute -top-6 px-2 py-1 text-xs bg-black text-white rounded"
                    style={{
                      left: `${(hoverTime / duration) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {formatTime(hoverTime)}
                  </div>
                )}
              </div>
            </div>

            <span className="text-[11px] text-gray-600 text-right">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <audio ref={audioRef} onEnded={() => {
          if (loopMode === "one") {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            playNext();
          }
        }} />
      </div>
    </div>

  );
}

export default Player;
