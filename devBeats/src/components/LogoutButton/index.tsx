import React from "react";
import { TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Você deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: () => {
            onLogout();
            navigation.navigate("Login" as never);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Icon name="logout" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};
