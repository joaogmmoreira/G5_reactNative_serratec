import React, { useEffect, useState, useRef } from "react";
import { Gradient } from "../../components/Gradient/Gradient";
import { styles } from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/Feather";
import { fetchSong } from "../../services/spotifyApi";

export interface PlayerDetailsProps {
  route?: {
    params: {
      id: string;
    };
  };
}

export interface Song {
  album: {
    album_type: string;
    artists: [];
    available_markets: [];
    external_urls: {};
    href: {};
  };
  artists: [];
  duration_ms: number;
  id: string;
  name: string;
  preview_url: string;
}

export const Player = ({ route }: PlayerDetailsProps) => {
  const [song, setSong] = useState<any>(null);
  const [totalTime, setTotalTime] = useState<string>("0:00");
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const id = route?.params?.id;

  const msToMinutesAndSeconds = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    if (Number(seconds) < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const handleSong = async () => {
    if (id) {
      const response = await fetchSong(id);
      setSong(response);
    }
  };

  const handleTotalTime = () => {
    setTotalTime(msToMinutesAndSeconds(song?.duration_ms));
  };

  const handleTime = () => {
    intervalRef.current = window.setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const showPlayedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (time >= song.duration_ms / 1000) {
      setIsPlaying(false);
    }
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const getProgressPercentage = () => {
    if (song?.duration_ms) {
      return (time / (song.duration_ms / 1000)) * 100;
    }
    return 0;
  };

  useEffect(() => {
    handleSong();
  }, []);

  useEffect(() => {
    handleTotalTime();
  }, [song]);

  useEffect(() => {
    if (isPlaying) {
      handleTime();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => clearInterval(intervalRef.current ?? undefined);
  }, [isPlaying]);

  return (
    <Gradient>
      {song && (
        <>
          <View style={styles.containerTitle}>
            <View style={styles.titleButtonDiv}>
              <TouchableOpacity>
                <Icon2 style={styles.titleButton} name="chevron-down" />
              </TouchableOpacity>
            </View>
            <View style={styles.titleButtonDiv}>
              <Text style={styles.pageTitle1}>TOCANDO MÚSICA</Text>
            </View>
            <View style={styles.titleButtonDiv}>
              <TouchableOpacity>
                <Icon3 style={styles.titleButton} name="dots-three-vertical" />
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={{ uri: song?.album.images[0].url }}
            style={styles.albumCover}
          />
          <View style={styles.musicInfo}>
            <View>
              <Text style={styles.songTitle}>{song.name}</Text>
              <Text style={styles.artist}>{song.artists[0].name}</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Icon style={styles.addToLibrary} name="check-circle" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.songControls}>
            <View style={styles.progress} />

            <View
              style={[
                styles.progressLine,
                { width: `${getProgressPercentage()}%` },
              ]}
            >
              <View style={styles.progressDot} />
            </View>
            <View style={styles.progressTime}>
              {/*adicionar função de barra progredindo*/}
              <Text style={styles.time}>{showPlayedTime()}</Text>
              <Text style={styles.time}>{totalTime}</Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity>
                <Icon style={styles.controlButtonShuffle} name="shuffle" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  style={styles.controlButtonNextPrevious}
                  name="skip-previous"
                />
              </TouchableOpacity>
              {isPlaying ? (
                <TouchableOpacity onPress={() => handlePlayPause()}>
                  <Icon style={styles.controlButtonPause} name="pause-circle" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handlePlayPause()}>
                  <Icon style={styles.controlButtonPause} name="play-circle" />
                </TouchableOpacity>
              )}
              <TouchableOpacity>
                <Icon
                  style={styles.controlButtonNextPrevious}
                  name="skip-next"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon style={styles.controlButton} name="repeat" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.minorControls}>
            <View style={styles.minorControlsMinor}>
              <TouchableOpacity>
                <Icon4 style={styles.laptop} name="laptop" />
              </TouchableOpacity>
              {/* <Text style={styles.device}>JUCAPC</Text> */}
            </View>
            <View style={styles.minorControlsMinor}>
              <TouchableOpacity>
                <Icon5 style={styles.share} name="share-2" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon3 style={styles.share} name="menu" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.aboutContainer}></View>
        </>
      )}
    </Gradient>
  );
};
