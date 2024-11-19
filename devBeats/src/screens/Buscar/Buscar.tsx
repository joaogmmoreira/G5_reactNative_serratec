import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { buscarCss } from "./buscarCss";

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
  images?: { url: string }[]; // Para artistas, playlists e álbuns
}

export function Buscar() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  // Obter o token de autenticação do Spotify
  const getSpotifyToken = async () => {
    const url = "https://accounts.spotify.com/api/token";
    const headers = {
      Authorization: `Basic YTMwYzhmODIwNDI2NDNmZTkyZmMzZTk4Nzk0Zjg2OTU6Nzc3MjhjMDI3Y2FlNGUxYmE1YmJlYWRiNDRkY2RiYTM=`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = "grant_type=client_credentials";

    try {
      const response = await axios.post(url, data, { headers });
      setToken(response.data.access_token);
      console.log("Token obtido com sucesso:", response.data.access_token);
    } catch (error) {
      console.error("Erro ao obter o token:", error);
    }
  };

  // Buscar playlists em destaque
  const fetchFeaturedPlaylists = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaylists(response.data.playlists.items);
    } catch (error) {
      console.error("Erro ao buscar playlists:", error);
    }
  };

  // Buscar itens com base no termo digitado
  const fetchSearchResults = async (term: string) => {
    if (!token || !term) return;

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: term,
          type: "track,album,artist,playlist",
          limit: 10,
        },
      });

      // Separar os itens por tipo
      const artists = response.data.artists.items;
      const tracks = response.data.tracks.items;
      const albums = response.data.albums.items;
      const playlists = response.data.playlists.items;

      // Concatenar, priorizando artistas
      const orderedItems: SearchItem[] = [
        ...artists,
        ...tracks,
        ...albums,
        ...playlists,
      ];

      setSearchResults(orderedItems);
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
  };
  // Obter o token ao montar o componente
  useEffect(() => {
    getSpotifyToken();
  }, []);

  // Buscar playlists em destaque assim que o token estiver disponível
  useEffect(() => {
    if (token) {
      fetchFeaturedPlaylists();
    }
  }, [token]);

  // Atualizar os resultados da pesquisa sempre que o termo mudar
  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults(searchTerm);
    } else {
      setSearchResults([]); // Limpa os resultados de busca se o campo de texto estiver vazio
    }
  }, [searchTerm]);

  // Renderizar cada item da FlatList
  const renderPlaylist = ({ item }: { item: Playlist }) => (
    <View style={buscarCss.item}>
      <Image source={{ uri: item.images[0]?.url }} style={buscarCss.image} />
      <Text style={buscarCss.text}>{item.name}</Text>
    </View>
  );

  // Renderizar cada item da busca
  const renderSearchItem = ({ item }: { item: SearchItem }) => {
    const navigation = useNavigation();
    // Determinar a URL da imagem com base no tipo de item
    const imageUrl =
      item.type === "track" && item.album?.images?.[0]?.url
        ? item.album.images[0].url
        : item.images?.[0]?.url || "default_image_url";

    const handlePress = () => {
      if (item.type === "artist") {
        navigation.navigate("ArtistDetail", { artistId: item.id }); // colocar navegação
      }
    };

    return (
      <View style={buscarCss.item}>
        <Image source={{ uri: imageUrl }} style={buscarCss.image} />
        <Text style={buscarCss.text}>{item.name}</Text>
      </View>
    );
  };

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
          renderItem={renderSearchItem}
          keyExtractor={(item) => item.id}
          numColumns={2} // Duas colunas
          contentContainerStyle={buscarCss.flatListContainer}
        />
      ) : (
        <FlatList
          data={playlists}
          renderItem={renderPlaylist}
          keyExtractor={(item) => item.id}
          numColumns={2} // Duas colunas
          contentContainerStyle={buscarCss.flatListContainer}
        />
      )}
    </LinearGradient>
  );
}
