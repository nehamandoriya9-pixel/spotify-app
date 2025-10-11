import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";


const ProfileModel = ({ isOpen, onClose }) => {
  const modelRef = useRef(null);
  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null;
  return (

    <div ref={modelRef} className='absolute right-0 mt-2 w-56 bg-neutral-900 text-white rounded-xl shadow-lg border border-gray-700 z-50'>
      <div className='p-4 border-b border-gray-700 flex flex-col items-start '>
        <p className="font-black">Neha</p>

        <ul className="p-4 flex  flex-col space-y-2">
          <li onClick={onClose} className='h-5 w-5 space-x-9'>Account</li>
          <li onClick={onClose} className='h-5 w-5 space-x-9'>Profile</li>
          <li onClick={onClose}>Upgrade to Premium</li>
          <li onClick={onClose}>Support</li>
          <li onClick={onClose}>Download</li>
          <li onClick={onClose}>Settings</li>
        </ul>

        <div className='p-4 border-b border-gray-700 flex flex-col items-start '>
          <button  onClick={handleLogout} className=" font-semibold flex items-center justify-center bg-transparent  text-white  py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-20   ">
          <p className='font-bold'>Logout</p>
        </button>
      </div>

    </div>
    </div >
  )
}

export default ProfileModel