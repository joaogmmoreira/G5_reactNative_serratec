import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface Playlist {
  images: { url: string }[];
  name: string;
  type: string;
}

interface SearchItems {
  images: { url: string }[];
  name: string;
  type?: string;
  album?: { images: { url: string }[] };
}

interface PlaylistCardProps {
  item: Playlist | SearchItems;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ item }) => {
  const navigate = useNavigation<any>();
  const handlePress = () => {
    navigate.navigate("Artista");
    // props para artista
  };

  const imageUrl = () => {
    if (
      item.type === "track" &&
      "album" in item &&
      item.album?.images?.[0]?.url
    ) {
      return item.album.images[0].url;
    } else {
      return item.images?.[0]?.url || "default_image_url";
    }
  };
  return (
    <TouchableOpacity onPress={() => handlePress()} style={styles.item}>
      <Image source={{ uri: imageUrl() }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};
