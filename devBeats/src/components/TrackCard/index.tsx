import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export interface TrackCardProps {
  item: {
    name: string;
  };
}

export const TrackCard: React.FC<TrackCardProps> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
};
