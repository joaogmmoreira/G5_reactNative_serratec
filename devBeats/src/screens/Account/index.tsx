import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { LogoutButton } from "../../components/LogoutButton";
import { getUserName } from "../../services/backendApi";
import { styles } from "./styles";
import { Gradient } from "../../components/Gradient/Gradient";
import { BackArrow } from "../../components/BackArrow";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: number;
  nome: string;
  email: string;
  foto: string;
  endereco: string;
}

export const Account = () => {
  const [userData, setUserData] = useState<User>({
    id: 0,
    nome: "",
    email: "",
    endereco: "",
    foto: "",
  });

  useEffect(() => {
    handleUserData();
  }, []);

  const handleUserData = async () => {
    const email = await AsyncStorage.getItem("user");
    if (email) {
      const response = await getUserName(email);
      const data = response.data[0];
      setUserData(data);
    }
  };

  return (
    <Gradient>
      <BackArrow />
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: userData.foto }} />
        <View style={styles.secondaryContainer}>
          <Text style={styles.text}>{`Nome: ${userData.nome}`}</Text>
          <Text style={styles.text}>{`Email: ${userData.email}`}</Text>
          <Text style={styles.text}>{`Endereço: ${userData.endereco}`}</Text>
        </View>
        <LogoutButton />
      </View>
    </Gradient>
  );
};
