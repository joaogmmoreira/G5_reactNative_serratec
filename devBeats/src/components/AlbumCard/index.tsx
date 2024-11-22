import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface AlbumCard {
  id: string;
  name: string;
  artists: [
    {
      name: string;
    }
  ];
  images: [{ url: string }];
}

export const AlbumCard: React.FC<AlbumCard> = ({
  name,
  id,
  artists,
  images,
}) => {
  const navigate = useNavigation<any>();

  const handlePress = () => {
    return navigate.navigate("player", { id });
  };

  return (
    <TouchableOpacity onPress={() => handlePress()} style={styles.container}>
      <Image source={{ uri: images[0].url }} style={styles.image} />
      <View style={styles.containerText}>
        <Text style={styles.songTitle}>{name}</Text>
        <Text style={styles.artistTitle}>{artists[0].name}</Text>
      </View>
    </TouchableOpacity>
  );
};
