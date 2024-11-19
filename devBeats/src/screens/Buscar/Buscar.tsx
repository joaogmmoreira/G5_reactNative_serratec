import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { buscarCss } from "./buscarCss";

interface Item {
  id: string;
  name: string;
  type: string;
  images: { url: string }[]; // Array de imagens
}

export function Buscar() {
  const [items, setItems] = useState<Item[]>([]); // Guardando os itens de busca
  const [searchTerm, setSearchTerm] = useState(""); // Armazenando o termo de pesquisa
  const [token, setToken] = useState<string | null>(null); // Armazenando o token

  // Função para obter o token
  const getSpotifyToken = async () => {
    const url = "https://accounts.spotify.com/api/token";
    const headers = {
      Authorization: `Basic YTMwYzhmODIwNDI2NDNmZTkyZmMzZTk4Nzk0Zjg2OTU6Nzc3MjhjMDI3Y2FlNGUxYmE1YmJlYWRiNDRkY2RiYTM=`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const data = "grant_type=client_credentials";

    try {
      const response = await axios.post(url, data, { headers });
      setToken(response.data.access_token); // Salva o token no estado
      console.log("Token obtido:", response.data.access_token);
    } catch (error) {
      console.error("Erro ao obter o token:", error);
    }
  };

  useEffect(() => {
    getSpotifyToken(); // Chama a função para obter o token quando o componente é montado
  }, []);

  // A cada mudança no termo de pesquisa, busca os itens
  useEffect(() => {
    const fetchItems = async () => {
      if (!searchTerm || !token) return; // Evita buscar se o campo de pesquisa estiver vazio ou o token não estiver definido

      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchTerm, // O termo de pesquisa
            type: "track,album,artist,playlist", // Tipos de itens que queremos buscar
            limit: 10, // Limite de resultados
          },
        });

        // Coletando itens de cada tipo de resposta
        const allItems = [
          ...response.data.tracks.items,
          ...response.data.albums.items,
          ...response.data.artists.items,
          ...response.data.playlists.items,
        ];

        setItems(allItems); // Atualiza o estado com os itens
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchItems();
  }, [searchTerm, token]); // Dependência de token e searchTerm

  // Função para renderizar o item (independente do tipo)
  const renderItem = ({ item }: { item: Item }) => {
    const imageUrl =
      item.images && item.images.length > 0
        ? item.images[0].url
        : "default_image_url"; // Imagem padrão caso não haja imagem
    const name = item.name || "Sem nome"; // Nome padrão caso o item não tenha nome

    return (
      <View style={buscarCss.item}>
        <Image source={{ uri: imageUrl }} style={buscarCss.image} />
        <Text style={buscarCss.text}>{name}</Text>
      </View>
    );
  };

  return (
    <View style={buscarCss.bodySearch}>
      <TextInput
        style={buscarCss.input}
        placeholder="Pesquise por faixas, álbuns, artistas, playlists..."
        value={searchTerm}
        onChangeText={setSearchTerm} // Atualiza o termo de pesquisa
      />

      {/* Exibe a lista de itens conforme a pesquisa */}
      <FlatList
        data={items} // Usando os itens retornados pela API
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={buscarCss.container}
      />
    </View>
  );
}
