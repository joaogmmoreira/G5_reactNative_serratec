
import React from "react";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/spotifyApi";
import { getUserName } from "../../services/backendApi";
import { View, FlatList, Text, Image } from "react-native";
import { CategoriesCard } from "../../components/CategoriesCard";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CategoriesCardProps {
  href: string;
  icons: [
    {
      height: number;
      url: string;
      width: number;
    }
  ];
  id: string;
  name: string;
}

interface UserDataProps {
  foto: string;
  nome: string;
}


export const Home = () => {
  const [categories, setCategories] = useState<CategoriesCardProps[]>([]);
  const [userData, setUserData] = useState<UserDataProps>();

  useEffect(() => {
    const fetchUserData = async () => {
      const email = await AsyncStorage.getItem("user");
      if (email) {
        const response = await getUserName(email);
        return setUserData(response.data[0]);
      }
    };
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data.categories.items);
    };
    fetchUserData();
    fetchData();
  }, []);

  return (

    <View>
      <Text>Home</Text>

    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Image source={{ uri: userData?.foto }} style={styles.image} />
        <Text style={styles.mainTitle}>Olá, {userData?.nome}</Text>
      </View>
      <Text style={styles.secondaryTitle}>Olha o que preparamos para você</Text>
      <View style={styles.container}>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoriesCard {...item} />}
          keyExtractor={(item) => item.id}
        />
      </View>

    </View>
  );
};
