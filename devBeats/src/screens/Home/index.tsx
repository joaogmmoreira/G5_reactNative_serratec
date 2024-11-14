import React, { useEffect } from "react";
import { createSpotifySession } from "../../services/spotifyApi/api";

export const Home = () => {
  const handleLogin = async () => {
    const response = await createSpotifySession();
    console.log(response);
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
