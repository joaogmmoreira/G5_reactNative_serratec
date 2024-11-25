import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { CategoriesCardProps } from "../../screens/Home";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export const CategoriesCard = (category: CategoriesCardProps) => {
  const navigate = useNavigation<any>();
  const { id, icons, name } = category;

  const handlePress = () => {
    return navigate.navigate("library", { id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <Image source={{ uri: icons[0].url }} style={styles.image} />
    </TouchableOpacity>
  );
};
