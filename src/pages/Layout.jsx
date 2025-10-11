import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    return (
        <>
            <Navbar />
            <div  className='flex bg-black   text-white '>
                {/* <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> */}



                <div
                    className={`flex-1 mb-24 flex flex-col  mt-20  ml-24 rounded-lg transition-all duration-300  bg-gradient-to-black from-green-800 via-gray-900 to-gray-900
  ${isSidebarOpen ? "ml-72 w-[calc(100%-16rem)]" : "ml-16 w-[calc(100%-4rem)]"}`}
                >
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout