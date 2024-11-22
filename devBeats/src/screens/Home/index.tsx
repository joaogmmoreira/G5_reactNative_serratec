import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/spotifyApi";
import { getUserName } from "../../services/backendApi";
import { View, FlatList, Text, Image } from "react-native";
import { CategoriesCard } from "../../components/CategoriesCard";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Gradient } from "../../components/Gradient/Gradient";
import { LogoutButton } from "../../components/LogoutButton";
import axios from "axios";

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
    fetchUserData();
    fetchData();
  }, []);

  const fetchUserData = async () => {
    const email = await AsyncStorage.getItem("user");
    if (email) {
      const response = await getUserName(email);
      return setUserData(response.data[0]);
    }
  };

  const fetchData = async () => {
    const data = await getCategories();
    const filteredData = data.categories.items.filter(
      (category: CategoriesCardProps) => {
        return (
          category.name !== "Feito para você" && category.name !== "Em casa"
        );
      }
    );

    setCategories(filteredData);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Usuário deslogado e AsyncStorage limpo.");
    } catch (error) {
      console.error("Erro ao limpar AsyncStorage:", error);
    }
  };

  return (
    <Gradient>
      <LogoutButton onLogout={handleLogout} />
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Image source={{ uri: userData?.foto }} style={styles.image} />
          <Text style={styles.mainTitle}>Olá, {userData?.nome}</Text>
        </View>
        <Text style={styles.secondaryTitle}>
          Olha o que preparamos para você
        </Text>
        <View style={styles.container}>
          <FlatList
            data={categories}
            renderItem={({ item }) => <CategoriesCard {...item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
      </View>
    </Gradient>
  );
};
