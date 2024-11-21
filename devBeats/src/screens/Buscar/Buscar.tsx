import React, { useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { buscarCss } from "./buscarCss";
import {
  fetchFeaturedPlaylists,
  fetchSearchResults,
} from "../../services/spotifyApi";
import { SearchCard } from "../../components/SearchCard";

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

    console.log(response);
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
    <LinearGradient colors={["#065055", "#000000"]} style={buscarCss.container}>
      {/* Campo de texto para pesquisa */}
      <TextInput
        style={buscarCss.input}
        placeholder="Procurar playlists, álbuns, artistas ou músicas..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />

      {/* FlatList condicional */}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <SearchCard item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={buscarCss.flatListContainer}
        />
      ) : (
        <FlatList
          data={playlists}
          renderItem={({ item }) => <SearchCard item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={buscarCss.flatListContainer}
        />
      )}
    </LinearGradient>
  );
}
