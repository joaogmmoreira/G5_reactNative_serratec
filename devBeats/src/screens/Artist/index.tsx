import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { fetchTopTracks, fetchAlbums } from "../../services/spotifyApi";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { SearchCard } from "../../components/SearchCard";
import { SongCard } from "../../components/SongCard";
import { Gradient } from "../../components/Gradient/Gradient";

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
}

export interface Track {
  id: string;
  type?: string;
  name: string;
  album: {
    images: [{ url: string }];
  };
  artists: [{ name: string }];
  preview_url: string;
  href: string;
}

interface ArtistDetailProps {
  route?: {
    params: {
      id: string;
      type: string;
    };
  };
}

export function Artist({ route }: ArtistDetailProps) {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  const navigate = useNavigation<any>();

  useEffect(() => {
    handleTopTracks();
    handleAlbums();
  }, []);

  const id = route?.params?.id;

  const handleTopTracks = async () => {
    if (!id) return;
    const response = await fetchTopTracks(id);
    setTopTracks(response.tracks);
  };

  const handleAlbums = async () => {
    if (!id) return;
    const response = await fetchAlbums(id);
    setAlbums(response.items);
  };

  return (
    <Gradient>
      <View style={styles.container}>
        <Text style={styles.title}>Músicas mais populares</Text>
        <FlatList
          data={topTracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SongCard {...item} />}
        />
        <Text style={styles.title}>Álbuns</Text>
        <FlatList
          data={albums}
          renderItem={({ item }) => <SearchCard item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
    </Gradient>
  );
}
