import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";
import { AuthContext } from "../../context/Auth";

export const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  // const navigation = useNavigation();

  // const handleLogout = () => {
  //   Alert.alert(
  //     "Sair",
  //     "Você deseja sair?",
  //     [
  //       { text: "Cancelar", style: "cancel" },
  //       {
  //         text: "Sim",
  //         onPress: () => {
  //           onLogout();
  //           navigation.navigate("Login" as never);
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  return (
    <TouchableOpacity style={styles.button} onPress={() => logout()}>
      <Icon name="logout" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};
