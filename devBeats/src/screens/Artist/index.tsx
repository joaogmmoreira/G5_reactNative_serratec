import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { fetchTopTracks, fetchAlbums } from "../../services/spotifyApi";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

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
    params: string;
  };
}

export function Artist({ route }: ArtistDetailProps) {
  const { params } = route;
  const navigate = useNavigation<any>();
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const handleTopTracks = async () => {
      if (!params) navigate.navigate("Home");
      const response = await fetchTopTracks(params);
      setTopTracks(response.tracks);
    };

    const handleAlbums = async () => {
      if (!params) navigate.navigate("Home");
      const response = await fetchAlbums(params);
      setAlbums(response.items);
    };
    handleTopTracks();
    handleAlbums();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Músicas mais populares</Text>
      <FlatList
        data={topTracks}
        renderItem={({ item }) => <Text style={styles.track}>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.title}>Álbuns</Text>
      <FlatList
        data={albums}
        renderItem={({ item }) => (
          <View style={styles.album}>
            <Image source={{ uri: item.images[0]?.url }} style={styles.image} />
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
}
