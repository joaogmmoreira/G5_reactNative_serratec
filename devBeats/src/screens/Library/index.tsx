import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { fetchCategory } from "../../services/spotifyApi";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { PlaylistCard } from "../../components/PlaylistCard";
import { Gradient } from "../../components/Gradient/Gradient";
import { getCategoriesPlaylists } from "../../services/spotifyApi";

export interface LibraryDetailProps {
  route?: {
    params: {
      id: string;
    };
  };
}

export interface UserLibrary {
  id: string;
  name: string;
  description: string;
  images: [
    {
      height: number;
      url: string;
      width: number;
    }
  ];
}

export interface Route {
  route?: {
    params: {
      id: string;
    };
  };
}

export const Library = ({ route }: LibraryDetailProps) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [userLibrary, setUserLibrary] = useState<any[]>([]);

  const id = route?.params?.id;

  const handleUserLibrary = async () => {
    const response = await getCategoriesPlaylists("rock");
    setUserLibrary(response.playlists.items);
  };

  const handlePlaylist = async () => {
    if (!id) return;
    const response = await fetchCategory(id);
    setPlaylists(response.playlists.items);
  };

  useEffect(() => {
    handlePlaylist();
    handleUserLibrary();
  }, []);

  return (
    <Gradient>
      <View style={styles.containerHeader}>
        <Icon2 name="arrow-left" size={20} color="#999" />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.pageTitle}>
          {id ? `Playlists sugeridas` : `Suas Playlists`}
        </Text>
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.songsQty}>
          {id
            ? `${playlists.length} playlists`
            : `${userLibrary.length} playlists`}
        </Text>
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
      {id ? (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaylistCard {...item} />}
        />
      ) : (
        <FlatList
          data={userLibrary}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaylistCard {...item} />}
        />
      )}
    </Gradient>
  );
};
