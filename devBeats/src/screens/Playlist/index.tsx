import React, { useEffect, useState } from "react";
import { Gradient } from "../../components/Gradient/Gradient";
import { FlatList } from "react-native-gesture-handler";
import { Text, Image, View } from "react-native";
import {
  fetchPlaylistData,
  fetchPlaylistTracks,
  fetchAlbum,
} from "../../services/spotifyApi";
import { TrackCard } from "../../components/TrackCard";
import { AlbumCard } from "../../components/AlbumCard";
import { styles } from "./styles";

export interface PlaylistDetailProps {
  route?: {
    params: {
      id: string;
      type: string;
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
    type?: string;
    name: string;
    album: {
      images: [{ url: string }];
    };
    artists: [{ name: string }];
    preview_url: string;
    href: string;
  };
}

export interface Album {
  id: string;
  type?: string;
  name: string;
  images: [{ url: string }];
  artists: [{ name: string }];
  preview_url: string;
  href: string;
  tracks: {
    items: [
      {
        name: string;
        id: string;
      }
    ];
  };
}

export const Playlist = ({ route }: PlaylistDetailProps) => {
  const [playlistData, setPlaylistData] = useState<PlaylistData>({
    name: "",
    description: "",
    images: [{ url: "" }],
  });
  const [playlistTracks, setPlaylistTracks] = useState<PlaylistTrack[]>([]);
  const [album, setAlbum] = useState<Album>({
    id: "",
    name: "",
    images: [{ url: "" }],
    artists: [{ name: "" }],
    preview_url: "",
    href: "",
    tracks: {
      items: [{ name: "", id: "" }],
    },
  });

  const id = route?.params.id || "";
  const type = route?.params.type || "";

  const handlePlaylistData = async () => {
    const response = await fetchPlaylistData(id);
    setPlaylistData(response);
  };

  const handlePlaylistTracks = async () => {
    const response = await fetchPlaylistTracks(id);
    console.log("Playlist Tracks Response:", response); // Log the response

    if (response && response.items) {
      const filteredResponse: PlaylistTrack[] = response.items.filter(
        (item: PlaylistTrack) => {
          return (
            item.track && item.track.id !== null && item.track.id !== undefined
          );
        }
      );
      setPlaylistTracks(filteredResponse);
    }
  };

  const handleAlbum = async () => {
    const response = await fetchAlbum(id);

    setAlbum(response);
  };

  useEffect(() => {
    if (type === "playlist") {
      handlePlaylistData();
      handlePlaylistTracks();
    }
    if (type === "album") {
      handleAlbum();
    }
  }, []);

  useEffect(() => {
    // console.log(playlistTracks.forEach((item) => console.log(item.track.id)));
    console.log();
  }, [playlistTracks]);

  return (
    <Gradient>
      {type === "playlist" ? (
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
      ) : (
        // <Text>Album</Text>
        <>
          <View style={styles.container}>
            <Image source={{ uri: album.images[0].url }} style={styles.image} />
            <View style={styles.containerText}>
              <Text>{album.name}</Text>
            </View>
          </View>
          <FlatList
            data={album.tracks.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AlbumCard
                name={item.name}
                id={item.id}
                artists={album.artists}
                images={album.images}
              />
            )}
          />
        </>
      )}
    </Gradient>
  );
};
