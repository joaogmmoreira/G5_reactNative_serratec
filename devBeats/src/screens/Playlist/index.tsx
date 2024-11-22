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
import { BackArrow } from "../../components/BackArrow";

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
    } else {
      console.error("Invalid response structure:", response);
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

  return (
    <Gradient>
      <BackArrow />
      {type === "playlist" ? (
        <>
          <View style={styles.container}>
            <Image
              source={{ uri: playlistData.images[0].url }}
              style={styles.image}
            />
            <View style={styles.containerText}>
              <Text style={styles.name}>{playlistData.name}</Text>
              <Text style={styles.description}>{playlistData.description}</Text>
            </View>
          </View>
          <FlatList
            data={playlistTracks}
            keyExtractor={(item) => item.track.id}
            renderItem={({ item }) => <TrackCard {...item} />}
          />
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Image source={{ uri: album.images[0].url }} style={styles.image} />
            <View style={styles.containerText}>
              <Text style={styles.name}>{album.name}</Text>
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
