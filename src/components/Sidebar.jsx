import React, { useState, useEffect } from 'react'
import { FaSpotify, FaTimes } from "react-icons/fa";
import { RiStackLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";



function Sidebar({ isSidebarOpen, setIsSidebarOpen, setIsSidebarHovering}) {
  const [isHovering, setIsHovering] = useState(false);
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(() => {
    if (isHovering) {
      document.body.style.overflow = "hidden";  
      setIsSidebarHovering(true);
    } else {
      document.body.style.overflow = "auto";    
      setIsSidebarHovering(false);
    }

    return () => {
      document.body.style.overflow = "auto";   
    };
  }, [isHovering, setIsSidebarHovering]);

  return (
    <div className={` fixed top-20 bg-[#121212] text-white h-screen rounded-lg flex flex-col 
        ${isSidebarOpen ? "w-72 " : "w-20  "}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      <button
        className='m-2 px-4 py-2 rounded-lg absolute left-4 '
        onClick={toggleSidebar}

      >
        {!isSidebarOpen && <GoSidebarCollapse className='w-5 h-5  ' size={0} />}
      </button>


      {isSidebarOpen && (



        <div className='bg-[#121212] max-h-screen w-72  rounded-lg flex flex-col justify-items-end '>

          <div className='p-4 flex items-center justify-between '>
            <div className='flex items-center gap-3 '
            >


              {isSidebarOpen && (
                <button
                  className={`m-2 px-4 py-2 rounded-lg transition-opacity duration-300 ease-in-out
      ${isHovering ? "opacity-100 translate-x-1" : "opacity-0 translate-x-3"}`}
                  onClick={toggleSidebar}

                >

                  {isSidebarOpen && <GoSidebarCollapse className='w-5 h-5  ' size={0} />}
                </button>
              )}
              {isSidebarOpen && <p className='font-semibold  '>Your Library</p>}
              <button className='absolute left-60'>

                <FaPlus className='w-6 h-6' />
              </button>

            </div>
          </div>

          <div className=" h-[35h] sidebar">

            <div className='p-1 bg-[#1F1F1F] m-2 rounded-2xl font-semibold flex flex-col items-start justify-start gap-1 pl-4 w-68 h-32 '>
              <h1 className='font-bold  h-6'>Create your first playlist</h1>
              <p className='font-semibold w-full '>It's easy we will help you</p>
              <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create Playlist</button>
            </div>
            <div className='p-1 bg-[#1F1F1F] m-2 rounded-2xl font-semibold flex flex-col items-start justify-start gap-1 pl-4 w-68 h-47 '>
              <h1 className='font-bold h-15 '>Let's find some podcasts to follow</h1>
              <p className='font-semibold max-w-[90%]'>we'll keep you new update on new episodes</p>
              <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse podcasts</button>
            </div>
          </div>
          {/* <div className="mt-20 ml-8 h-[20vh]">

            <div className='flex space-x-4 flex-row items-start h-4 justify-start '>
              <button className='font-light text-xs'>Legal</button>
              <button className='font-light text-xs'>Saftey & privacy center</button>
            </div>
            <div className='flex space-x-8 flex-row items-start h-4 '>
              <button className='font-light text-xs '>Privacy Policy</button>
              <button className='font-light text-xs'>Cookies</button>
              <button className='font-light text-xs'>About ads</button>

            </div>
            <div className='flex space-x-8 flex-col items-start'>
              <button className='font-light text-xs h-6 '>Accessibility</button>
              <button className='font-bold text-xs h-6' >Cookies</button>

            </div>
            <button className="flex items-center justify-center bg-transparent  text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-30 gap-2.5"> <GiWorld />English</button>

          </div> */}
        </div>
      )}
    </div>


  )


}


export default Sidebar