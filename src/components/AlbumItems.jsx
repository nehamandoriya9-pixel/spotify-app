import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

function AlbumItems({ name, desc, image, song, onPlay, currentSong, isPlaying }) {
  const [isHovered, setIsHovered] = useState(false);

  const isCurrent = currentSong?.id === song?.id;


  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#1E1E1E] min-w-[180px] h-[300px] p-3 hover:bg-[#5d487526] rounded relative overflow-y-auto"
    >
      <img className="rounded" src={image} alt={name} />
      <p className="font-bold mt-2 mb-1 text-white">{name}</p>
      <p className="text-slate-400 text-sm">{desc}</p>
      {isHovered && song && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onPlay(song);
          }}
          className="absolute bottom-4 right-4 bg-green-600 p-2 rounded-full shadow-lg"
        >
          {isCurrent && isPlaying ? (
            <FaPause className="text-white h-5 w-5" />
          ) : (
            <FaPlay className="text-white h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
}

export default AlbumItems;
