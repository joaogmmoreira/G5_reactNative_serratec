import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { CategoriesCardProps } from "../../screens/Home";
import { styles } from "./styles";

export const CategoriesCard = (category: CategoriesCardProps) => {
  const { href, icons, name } = category;

  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: icons[0].url }} style={styles.image} />
    </TouchableOpacity>
  );
};
