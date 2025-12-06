import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { searchTracks } from "../api/endpoints";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import AlbumItems from "../components/AlbumItems";
import Loader from "../components/Loader";

// Map category titles to actual search queries
const defaultQueries = [
    { title: "Bollywood Hits", query: "bollywood hits" },
    { title: "All Out 00s Hindi", query: "old hindi songs" },
    { title: "Bollywood Hits by Pritam", query: "pritam" },
    { title: "This Is Arijit Singh", query: "arijit singh" }
];

const ShowAll = ({ handlePlay, currentSong, isPlaying, currentIndex }) => {
    const { category } = useParams();
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSongs() {
            setIsLoading(true);
            try {
                // Decode URL and find the actual query
                const decodedCategory = decodeURIComponent(category);
                const matchedQuery = defaultQueries.find(
                    (item) => item.title.toLowerCase() === decodedCategory.toLowerCase()
                )?.query || decodedCategory; // fallback to category if not found

                console.log("Searching for query:", matchedQuery);

                const data = await searchTracks(encodeURIComponent(matchedQuery), 20);
                setSongs(data?.tracks?.items || []);
            } catch (err) {
                console.error("Failed to fetch tracks:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSongs();
    }, [category]);

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col min-h-screen px-28 py-10 mt-10">
            <div className="flex-1 px-8 justify-center overflow-y-auto p-6 h-[calc(100vh-5rem)]">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="flex gap-3">
                            <button onClick={handleClick}>
                                <FaBackward className="h-5 w-5" />
                            </button>
                            <h1 className="text-xl font-bold">{decodeURIComponent(category)}</h1>
                        </div>

                        <div className="grid grid-cols-6 gap-4 mt-6">
                            {songs.slice(0, 18).map((song, index) => (
                                <AlbumItems
                                    key={song.id}
                                    name={song.name}
                                    desc={song.artists.map(a => a.name).join(", ")}
                                    image={song.album.images[0]?.url}
                                    song={song}
                                    onPlay={() => handlePlay(song, index)}
                                    currentSong={currentSong}
                                    isPlaying={isPlaying}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowAll;
