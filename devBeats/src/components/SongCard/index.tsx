import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { Track } from "../../screens/Artist";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export const SongCard = (item: Track) => {
  const { id, preview_url, href } = item;
  const navigate = useNavigation<any>();

  const handlePress = () => {
    navigate.navigate("player", { id, preview_url, href });
  };

  return (
    <TouchableOpacity onPress={() => handlePress()} style={styles.container}>
      <Image source={{ uri: item.album.images[0].url }} style={styles.image} />
      <View style={styles.containerText}>
        <Text style={styles.songTitle}>{item.name}</Text>
        <Text style={styles.artistTitle}>{item.artists[0].name}</Text>
      </View>
    </TouchableOpacity>
  );
};
