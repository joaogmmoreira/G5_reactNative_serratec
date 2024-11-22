import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { styles } from "./styles";

export const BackArrow = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.containerHeader}
    >
      <Icon2 name="arrow-left" size={20} color="white" />
    </TouchableOpacity>
  );
};
