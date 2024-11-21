import React, { useEffect, useState } from "react";
import { Gradient } from "../../components/Gradient/Gradient";
import { FlatList } from "react-native-gesture-handler";
import { Text, Image, View } from "react-native";
import {
  fetchPlaylistData,
  fetchPlaylistTracks,
} from "../../services/spotifyApi";
import { TrackCard } from "../../components/TrackCard";
import { styles } from "./styles";

export interface PlaylistDetailProps {
  route?: {
    params: {
      id: string;
    };
  };
}

export interface PlaylistData {
  name: string;
  description: string;
  images: [{ url: string }];
}

export interface PlaylistTrack {
  track: {
    id: string;
    name: string;
    album: {
      images: [{ url: string }];
    };
    artists: [{ name: string }];
    preview_url: string;
    href: string;
  };
}

export const Playlist = ({ route }: PlaylistDetailProps) => {
  const id = route?.params.id || "";
  const [playlistData, setPlaylistData] = useState<PlaylistData>({
    name: "",
    description: "",
    images: [{ url: "" }],
  });
  const [playlistTracks, setPlaylistTracks] = useState<PlaylistTrack[]>([]);

  const handlePlaylistData = async () => {
    const response = await fetchPlaylistData(id);
    setPlaylistData(response);
  };

  const handlePlaylistTracks = async () => {
    const response = await fetchPlaylistTracks(id);
    setPlaylistTracks(response.items);
  };

  useEffect(() => {
    handlePlaylistData();
    handlePlaylistTracks();
  }, []);

  useEffect(() => {
    playlistTracks.forEach((item) =>
      console.log(item.track.album.images[0].url)
    );
  }, [playlistTracks]);

  return (
    <Gradient>
      {playlistData && (
        <>
          <View style={styles.container}>
            <Image
              source={{ uri: playlistData.images[0].url }}
              style={styles.image}
            />
            <View style={styles.containerText}>
              <Text>{playlistData.name}</Text>
              <Text>{playlistData.description}</Text>
            </View>
          </View>
          <FlatList
            data={playlistTracks}
            keyExtractor={(item) => item.track.id}
            renderItem={({ item }) => <TrackCard {...item} />}
          />
        </>
      )}
    </Gradient>
  );
};
