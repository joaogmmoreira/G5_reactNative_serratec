import React, { useEffect, useState } from "react";
import { FlatList, TextInput, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import {
  fetchFeaturedPlaylists,
  fetchSearchResults,
} from "../../services/spotifyApi";
import { SearchCard } from "../../components/SearchCard";
import {
  Poppins_600SemiBold_Italic,
  Poppins_100Thin,
  useFonts,Poppins_300Light, Poppins_500Medium,
} from "@expo-google-fonts/poppins";


interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SearchItem {
  id: string;
  name: string;
  type: string; // Pode ser "track", "album", "artist", "playlist"
  album?: { images: { url: string }[] }; // Para músicas
  images: { url: string }[]; // Para artistas, playlists e álbuns
}

export function Buscar() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const handlePlaylists = async () => {
    const response = await fetchFeaturedPlaylists();
    setPlaylists(response.playlists.items);
  };

  const handleSearchResults = async (term: string) => {
    const response = await fetchSearchResults(term);

    const artists = response.artists.items;
    const tracks = response.tracks.items;
    const albums = response.albums.items;
    const playlists = response.playlists.items;

    const orderedItems: SearchItem[] = [
      ...artists,
      ...tracks,
      ...albums,
      ...playlists,
    ];

    const filteredItems = orderedItems.filter(
      (item) => item !== null && item !== undefined
    );
    const [fontLoaded] = useFonts({
      Poppins_600SemiBold_Italic,
      Poppins_500Medium,
    });


    setSearchResults(filteredItems);
  };

  useEffect(() => {
    handlePlaylists();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearchResults(searchTerm);
    }
  }, [searchTerm]);
  

  return (
    <LinearGradient colors={["#065055", "#000000"]} style={styles.container}>
      <View style={styles.searchBox}>
      <Image
          source={{ uri: 'https://i.ibb.co/ZXD1791/logo-devbeats.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Buscar</Text>
        </View>
        <LinearGradient colors={["#000000", "#065055"]} style={styles.teste}>

        <TextInput
          style={styles.input}
          placeholder="Procurar playlists, álbuns, artistas ou músicas..."
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
            </LinearGradient>

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <SearchCard item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <FlatList
          data={playlists}
          renderItem={({ item }) => <SearchCard item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </LinearGradient>
  );
}
