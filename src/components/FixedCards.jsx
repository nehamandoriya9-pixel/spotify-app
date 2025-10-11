export default function FixedCards({ title, tracks }) {
  const colors = [
    "from-pink-500 to-purple-700",
    "from-green-500 to-blue-600",
    "from-yellow-400 to-orange-600",
    "from-indigo-500 to-cyan-600",
    "from-red-500 to-pink-600",
  ];

  // const displaytracks = loading
  // ? Array.from({ length: 6 }).map((_, i) => ({
  //   id: i,
    
  //   isPlaceholder: true,
  // }))
  // : tracks || []

  return (
    <div className="p-6 bg-black">
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tracks.slice(0, 10).map((track, i) => (
          <div
            key={track.id}
            className={`p-4 rounded-xl cursor-pointer bg-gradient-to-br ${
              colors[i % colors.length]
            } hover:scale-105 transition`}
          >
            {track.isPlaceholder ? (
             
              <div className="w-full h-40 rounded-md mb-3 animate-pulse bg-opacity-30" />
            ) : (
              <>
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-white font-semibold truncate">
                  {track.name}
                </h3>
                <p className="text-white/80 text-sm truncate">
                  {track.artists.map((a) => a.name).join(", ")}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
