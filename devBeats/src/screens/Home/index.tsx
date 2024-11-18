import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/spotifyApi";
import { View, FlatList } from "react-native";
import { CategoriesCard } from "../../components/CategoriesCard";
import { styles } from "./styles";

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

export const Home = () => {
  const [categories, setCategories] = useState<CategoriesCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data.categories.items);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.categoriesList}
        data={categories}
        renderItem={({ item }) => <CategoriesCard {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
