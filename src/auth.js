// src/auth.js
const CLIENT_ID =  "4a52e88439bb4ba0b3a3f015476bba5f"; 
const CLIENT_SECRET = "cc105e920ef648b1b1a3352e235c12d9"
const REDIRECT_URI = "https://localhost:5173/callback"; // must match in Spotify dashboard
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "accesstoken";

export const loginWithSpotify = () => {
  window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
};

export const getTokenFromUrl = () => {
  const hash = window.location.hash;
  let accesstoken = window.localStorage.getItem("accesstoken");

  console.log("tokewnnn", accesstoken)

  if (!accesstoken && hash) {
    accesstoken = new URLSearchParams(hash.substring(1)).get("accesstoken");
    window.location.hash = "";
    window.localStorage.setItem("accesstoken", accesstoken);
  }

  return accesstoken;
};

export const logout = () => {
  window.localStorage.removeItem("accessToken");
  window.location.reload();
};
