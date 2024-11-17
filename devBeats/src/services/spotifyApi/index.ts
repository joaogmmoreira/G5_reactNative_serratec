import axios from "axios";
import qs from "qs";

const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;
const LOGIN_URL = process.env.EXPO_PUBLIC_SPOTIFY_LOGIN_URL;
const api = process.env.EXPO_PUBLIC_SPOTIFY_API_URL;

export const createSpotifySession = async () => {
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: "client_credentials",
  };

  try {
    const response = await axios.post(LOGIN_URL, qs.stringify(data), headers);
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

export const setToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

// export const getPlaylists = async () => {
//   try {
//     const response = await api.get("/browse/featured-playlists");

//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
