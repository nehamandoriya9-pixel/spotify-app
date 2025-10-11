
import footerLinks from "../data/footerLinks";

const Contentfeed = () => {
  
   return (
    <div className="bg-black text-white h-screen p-6 py-10 overflow-y-auto ">
      <h1 className="text-3xl font-bold ">What's New</h1>
      <p className="mb-4">The latest releases from artists, podcasts and shows you follow.</p>
      <div className="flex flex-row gap-4 whitespace-nowrap">
        <button className="flex items-center justify-center   text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white bg-[#2A2A2A] w-20 gap-2.5 ">Music</button>
        <button className="flex items-center justify-center bg-[#2A2A2A]  text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-45 gap-2.5">Podcast & shows</button>
      </div>
      
      <div className="mt-20 text-4xl items-center px-20">
        <h1 className="font-black ">We don't have any updates for you yet</h1>
        
    </div>
    <div className="mt-10 text-xl px-9 mb-50">
      <h1 className="font-medium ">When there’s news, we’ll post it here. Follow your favourite artists and podcasts to stay updated on them too.</h1>
    </div>
    {/* <div className="flex bg-red-50"> */}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-10 border-t border-gray-700">
    {footerLinks.map((section, index) => (
  <div key={index}>
    {section.title && <h3 className="font-bold text-white mb-2">{section.title}</h3>}
    {section.links && (
      <ul className="space-y-1">
        {section.links.map((link, i) => (
          <li
            key={i}
            className="text-gray-400 hover:underline cursor-pointer"
          >
            {link}
          </li>
        ))}
      </ul>
    )}

    {section.socials && (
      <div className="flex gap-4 mt-4">
        {section.socials.map((icon, i) => (
          <span key={i} className="cursor-pointer hover:text-gray-400">
            {icon}
          </span>
        ))}
      </div>
    )}
  </div>
))}
</div>
    </div>

      // </div>
   ); 
}

export default Contentfeed
