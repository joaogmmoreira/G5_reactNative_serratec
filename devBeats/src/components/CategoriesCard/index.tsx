import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { CategoriesCardProps } from "../../screens/Home";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export const CategoriesCard = (category: CategoriesCardProps) => {
  const { id, icons, name } = category;
  const navigate = useNavigation<any>();

  const handlePress = () => {
    return navigate.navigate("playlist", { id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: icons[0].url }} style={styles.image} />
    </TouchableOpacity>
  );
};
