function Chart({ name, desc, image }) {
  return (
    <div className="bg-[#1E1E1E] min-w-[250px] p-4  hover:bg-[#5d487526] cursor-pointer rounded">
      <img className="rounded" src={image} alt={name} />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
}

export default Chart;
