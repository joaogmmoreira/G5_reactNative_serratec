import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { styles } from "./styles";
import { PlaylistTrack } from "../../screens/Playlist";
import { useNavigation } from "@react-navigation/native";

export const TrackCard = (item: PlaylistTrack) => {
  const navigate = useNavigation<any>();

  const { track } = item;
  const handlePress = () => {
    return navigate.navigate("player", { id: track.id });
  };

  return (
    <TouchableOpacity onPress={() => handlePress()} style={styles.container}>
      <Image source={{ uri: track.album.images[0].url }} style={styles.image} />
      <View style={styles.containerText}>
        <Text style={styles.songTitle}>{track.name}</Text>
        <Text style={styles.artistTitle}>{track.artists[0].name}</Text>
      </View>
    </TouchableOpacity>
  );
};
