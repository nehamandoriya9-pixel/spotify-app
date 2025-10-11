import { motion } from "framer-motion";
import { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const NowPlayingView = ({ currentSong, isPlaying, showNowPlaying, setShowNowPlaying }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    if (!currentSong || !showNowPlaying) return null;

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="fixed right-0 top-20 h-full flex">
            
            <motion.div
                animate={{ width: isCollapsed ? 0 : 320 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-gray-900 border-l-2 border-gray-700 h-full overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="h-10 w-10 bg-gray-800 text-white p-2 rounded-l-md self-start hover:bg-gray-700 transition-colors"
                    onClick={toggleCollapse}
                >
                    {isHovered && (
                        <button>
                            {isCollapsed ? (
                                <GoSidebarExpand className="h-6 w-6" />
                            ) : (
                                <GoSidebarCollapse className="h-6 w-6" />
                            )}
                        </button>
                    )}
                </div>

                <div className="p-4 w-80">
                    <div className="flex flex-col items-center">
                       
                        <img
                            src={currentSong?.album?.images?.[0]?.url}
                            alt={currentSong?.name}
                            className="w-60 h-60 rounded-xl mb-6"
                        />

                        <h2 className="text-2xl font-bold text-white text-center mb-2">
                            {currentSong?.name}
                        </h2>

                        <p className="text-gray-400 text-center mb-6">
                            {currentSong?.artists?.map((a) => a.name).join(", ")}
                        </p>

                        <div className="text-white">
                            {isPlaying ? (
                                <p className="text-green-400">▶ Now Playing</p>
                            ) : (
                                <p className="text-yellow-400">⏸ Paused</p>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NowPlayingView;
