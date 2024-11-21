import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { fetchCategory } from "../../services/spotifyApi";
import { FlatList } from "react-native-gesture-handler";
import { CategoriesCard } from "../../components/CategoriesCard";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon5 from "react-native-vector-icons/Feather";
import Icon6 from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";
import { PlaylistCard } from "../../components/PlaylistCard";
import { Gradient } from "../../components/Gradient/Gradient";

export interface LibraryDetailProps {
  route?: {
    params: {
      id: string;
    };
  };
}

export const Library = ({ route }: LibraryDetailProps) => {
  const [playlists, setPlaylists] = useState<any[]>([]);

  const id = route?.params.id || "";

  const handlePlaylist = async () => {
    const response = await fetchCategory(id);
    setPlaylists(response.playlists.items);
  };

  useEffect(() => {
    handlePlaylist();
  }, []);

  return (
    <Gradient>
      <View style={styles.containerHeader}>
        <Icon2 name="arrow-left" size={20} color="#999" />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.pageTitle}>Músicas Curtidas</Text>
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.songsQty}>235 músicas</Text>
      </View>
      <View style={styles.containerHeaderMenu}>
        <View>
          <Icon3
            style={styles.bottomUp}
            name="arrow-down-circle-outline"
            size={25}
            color="#999"
          />
        </View>
        <View style={styles.containerHeaderMenuButtons}>
          <Icon style={styles.controlButtonShuffle} name="shuffle" />
          <Icon style={styles.controlButtonPause} name="pause-circle" />
        </View>
      </View>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaylistCard {...item} />}
      />
    </Gradient>
  );
};
