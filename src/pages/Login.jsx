import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { div } from "framer-motion/client";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const ok = await login(email, password);
    if (ok) {
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

   const handleGoToSignup = () => {
        navigate('/Signup');

    }
   

  return (
    <div className="h-[90%] overflow-y-auto w-full   ">
    <div className="flex flex-col items-center justify-center  bg-black text-white  ">
     
      <form
        onSubmit={handleSubmit}
        className="bg-[#121212] p-10 rounded-lg shadow-lg w-[600px] flex flex-col  "
      >
        <FaSpotify className="self-center h-10 w-10 " />
        <h1 className="text-2xl font-bold mb-6 text-center">Log in to Spotify</h1>

        <button
          className="flex items-center justify-center gap-3 border border-gray-600 rounded-full py-3 mb-3 hover:bg-[#1a1a1a] w-90 self-center"
        >
          <FaFacebook className="text-blue-500 text-lg" />
          Continue with Facebook
        </button>

        <button
          className="flex items-center justify-center gap-3 border border-gray-600 rounded-full py-3 mb-3 hover:bg-[#1a1a1a]  w-90 self-center "
        >
          <FcGoogle className="text-lg" />
          Continue with Google
        </button>

        <button
          className="flex items-center justify-center gap-3 border border-gray-600 rounded-full py-3 mb-6 hover:bg-[#1a1a1a]  w-90 self-center"
        >
          <FaApple className="text-lg" />
          Continue with Apple
        </button>
        <button
          className="flex items-center justify-center gap-3 border border-gray-600 rounded-full py-3 mb-6 hover:bg-[#1a1a1a]  w-90 self-center"
        >
          Continue with Phone Number
        </button>

        <div className="border-t border-gray-700 my-6"></div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <label className="text-sm mb-1  w-90 self-center">Email or username</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or username"
          className="p-3 mb-4 rounded bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-green-500  w-90 self-center"
          required
        />

        <label className="text-sm mb-1  w-90 self-center">Password </label>
<div className="relative self-center">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 mb-8  rounded  text-white focus:outline-none focus:ring-2 focus:ring-green-500 bg-[#2a2a2a]  w-90"
          required

        />
        <span className="absolute right-2 top-1/2 -translate-y-6" onClick={() => setShowPassword((prev) => !prev)} >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
</div>
        <button
          className="bg-green-500 text-black font-bold py-3 rounded-full hover:bg-green-600  w-90 self-center"
        >
          Log In
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center cursor-pointer hover:underline">
          Forgot your password?
        </p>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400">Don't have an account?</p>
          <button
            href="#"
            className="text-white font-bold hover:underline cursor-pointer" onClick={handleGoToSignup}
          >
            Sign up for Spotify
          </button>
        </div>
      </form>
    </div>
     </div>
  );
}
