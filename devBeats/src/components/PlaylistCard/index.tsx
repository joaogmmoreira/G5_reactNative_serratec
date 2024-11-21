import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface PlaylistCardProps {
  id: string;
  name: string;
  description: string;
  images: [
    {
      height: number;
      url: ImageSourcePropType;
      width: number;
    }
  ];
}

export function PlaylistCard(props: PlaylistCardProps) {
  const { id, images, name, description } = props;

  const navigate = useNavigation<any>();

  const handlePress = () => {
    return navigate.navigate("playlist", { id, type: "playlist" });
  };

  return (
    <View style={styles.songCard}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.songButton}
        onPress={() => handlePress()}
      >
        <View style={styles.songInfo}>
          <Image source={images[0].url} style={styles.image} />
          <View style={styles.songTitle}>
            <Text style={styles.songText}>{name}</Text>
            <Text style={styles.songArtist}>{description}</Text>
          </View>
        </View>
        <Icon style={styles.songText} name="dots-three-vertical" />
      </TouchableOpacity>
    </View>
  );
}
