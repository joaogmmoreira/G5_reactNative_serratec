import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { styles } from "./styles";
import { PlaylistTrack } from "../../screens/Playlist";

export const TrackCard: React.FC<PlaylistTrack> = (item) => {
  const { track, preview_url, href } = item;
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: track.album.images[0].url }} style={styles.image} />
      <View style={styles.containerText}>
        <Text style={styles.songTitle}>{track.name}</Text>
        <Text style={styles.artistTitle}>{track.artists[0].name}</Text>
      </View>
    </TouchableOpacity>
  );
};
