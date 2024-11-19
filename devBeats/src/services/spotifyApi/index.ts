import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import qs from "qs";

const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;
const LOGIN_URL = process.env.EXPO_PUBLIC_SPOTIFY_LOGIN_URL;
const API_URL = process.env.EXPO_PUBLIC_SPOTIFY_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

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
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get("/browse/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFeaturedPlaylists = async () => {
  try {
    const response = await api.get("/browse/featured-playlists");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchResults = async (term: string) => {
  try {
    const response = await api.get("/search", {
      params: {
        q: term,
        type: "track,album,artist,playlist",
        limit: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopTracks = async (artistId: string) => {
  try {
    const response = await api.get(`/artists/${artistId}/top-tracks`, {
      params: { market: "US" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar músicas mais populares:", error);
  }
};

export const fetchAlbums = async (artistId: string) => {
  try {
    const response = await api.get(`/artists/${artistId}/albums`, {
      params: { include_groups: "album,single", limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar álbuns:", error);
  }
};
