import React, { useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { buscarCss } from "./buscarCss";
import {
  fetchFeaturedPlaylists,
  fetchSearchResults,
} from "../../services/spotifyApi";
import { PlaylistCard } from "../../components/SearchCard";

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

    setSearchResults(orderedItems);
  };

  useEffect(() => {
    handlePlaylists();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      handleSearchResults(searchTerm);
    }
    console.log(searchResults);
    console.log(playlists);
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
      {searchTerm ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <PlaylistCard item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={buscarCss.flatListContainer}
        />
      ) : (
        <FlatList
          data={playlists}
          renderItem={({ item }) => <PlaylistCard item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={buscarCss.flatListContainer}
        />
      )}
    </LinearGradient>
  );
}
