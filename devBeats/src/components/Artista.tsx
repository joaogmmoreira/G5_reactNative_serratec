import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import { artistaStyle } from "./artistaCss";

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
}

interface ArtistDetailProps {
  route: {
    params: {
      artistId: string;
    };
  };
}

export function ArtistDetail({ route }: ArtistDetailProps) {
  const { artistId } = route.params;
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Aqui você pode usar o token já gerado anteriormente.
    // (Ou ajustar para passar via contexto, caso necessário.)
    const fetchToken = async () => {
      const url = "https://accounts.spotify.com/api/token";
      const headers = {
        Authorization: `Basic YTMwYzhmODIwNDI2NDNmZTkyZmMzZTk4Nzk0Zjg2OTU6Nzc3MjhjMDI3Y2FlNGUxYmE1YmJlYWRiNDRkY2RiYTM=`,
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const data = "grant_type=client_credentials";

      try {
        const response = await axios.post(url, data, { headers });
        setToken(response.data.access_token);
      } catch (error) {
        console.error("Erro ao obter o token:", error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    // Buscar músicas mais populares
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { market: "US" },
          }
        );
        setTopTracks(response.data.tracks);
      } catch (error) {
        console.error("Erro ao buscar músicas mais populares:", error);
      }
    };

    // Buscar álbuns do artista
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/albums`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { include_groups: "album,single", limit: 10 },
          }
        );
        setAlbums(response.data.items);
      } catch (error) {
        console.error("Erro ao buscar álbuns:", error);
      }
    };

    fetchTopTracks();
    fetchAlbums();
  }, [token]);

  return (
    <View style={artistaStyle.container}>
      <Text style={artistaStyle.title}>Músicas mais populares</Text>
      <FlatList
        data={topTracks}
        renderItem={({ item }) => (
          <Text style={artistaStyle.track}>{item.name}</Text>
        )}
        keyExtractor={(item) => item.id}
      />

      <Text style={artistaStyle.title}>Álbuns</Text>
      <FlatList
        data={albums}
        renderItem={({ item }) => (
          <View style={artistaStyle.album}>
            <Image
              source={{ uri: item.images[0]?.url }}
              style={artistaStyle.image}
            />
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
}
