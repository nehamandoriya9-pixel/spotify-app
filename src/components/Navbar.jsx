import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { GrSpotify } from "react-icons/gr";
import { IoSearchSharp } from "react-icons/io5";
import { FaFirefoxBrowser } from "react-icons/fa6";
import { FaArrowCircleDown } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import { FaUsersLine } from "react-icons/fa6";
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';



function Navbar({ searchQuery, setSearchQuery }) {

  const [isHovering, setIsHovering] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }


  }
  return (
    <nav className='bg-[#0f0f0f] w-full px-4 fixed z-30'>
      <div className=' w-full flex items-center max-w-md gap-6'>
        <a className='flex gap-6' href="/" style={{ color: 'white', marginRight: '15px', }}>
          <GrSpotify className='w-8 h-16  mx-px ' />
          <IoHomeOutline className='w-8 h-16 mx-px ' />
        </a>

        <form onSubmit={handleSearch} className="relative flex items-center  space-x-44">
          <input
            type='text'
            placeholder='What do you want to play ?'
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value
              setSearchQuery(value);
              if (value.trim()) {
                navigate(`/search/${encodeURIComponent(value)}`);
              }
            }}
            className="w-full pl-8 relative bg-[#2A2A2A] text-white placeholder-gray-400 px-4 min-w-96 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white "

          />
          <span className='absolute left-2  '>

            <IoSearchSharp className=' w-5 h-5 ' />

          </span>
          <span className=' absolute left-85'>
            <FaFirefoxBrowser className=' w-5 h-5' />
          </span>

        </form>
        <div className="flex ">
          <button className=" whitespace-nowrap text-black bg-amber-50 rounded-full font-bold w-40 h-10">
            Explore Premium
          </button>

          {/* <button className=" text-gray-300 font-semibold px-1  rounded ">
            Support
          </button>
          <button className="text-gray-300 font-semibold rounded px-2 ">Download</button> */}

          {/* <div className="w-[1px] bg-[#f0f0f0] h-9 "></div> */}
        </div>

        <div className='flex space-x-4'>

          <button className='whitespace-nowrap px-18 text-gray-300 font-semibold ' >
            ⬇ Install App</button>

        </div>
        <div className=' w-full flex items-center max-w-md gap-6'>
          <div className='flex gap-6' href="/" style={{ color: 'white', marginRight: '15px', }}>
            <button onClick={() => navigate("/content-feed")}>
              <CiBellOn className='w-6 h-6 flex px-2xl left-36' />
            </button>
            <FaUsersLine className='w-6 h-6 flex px-2xl left-12' />
          </div>
        </div>

        {/* onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className='flex space-x-4  bg-[#1E1E1E] min-w-[180px] p-3 hover:bg-[#5d487526] rounded relative' */}
        <div className='realative'>


          <button
            onClick={toggleProfile}
            className="whitespace-nowrap text-black font-bold bg-[#F573A0] h-8 w-8 rounded-full flex justify-center items-center"
          >
            N
          </button>




          <ProfileModel isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </div>
      </div>

    </nav>
  );
}

export default Navbar;
