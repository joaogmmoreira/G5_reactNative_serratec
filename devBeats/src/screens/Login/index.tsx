import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../context/Auth";
import { styles } from "./styles";
import {
  useFonts,
  Silkscreen_700Bold,
  Silkscreen_400Regular,
} from "@expo-google-fonts/silkscreen";
import {
  Poppins_600SemiBold_Italic,
  Poppins_100Thin,
} from "@expo-google-fonts/poppins";
import { Gradient } from "../../components/Gradient/Gradient";
import { useNavigation } from "@react-navigation/native";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigation = useNavigation<any>();

  const [fontLoaded] = useFonts({
    Silkscreen_700Bold,
    Silkscreen_400Regular,
    Poppins_600SemiBold_Italic,
    Poppins_100Thin,
  });

  useEffect(() => {
    formValidation();
  }, [form]);

  const { login } = useContext(AuthContext);

  const formValidation = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(form.email);

    if (isEmailValid && form.password.length >= 6) {
      return setButtonDisabled(false);
    }

    return setButtonDisabled(true);
  };

  const onChangeForm = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const onButtonClick = () => {
    login(form);
  };

  return (
    <Gradient>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://i.ibb.co/ZXD1791/logo-devbeats.png" }}
          style={styles.logo}
        />
        <View>
          <Text style={styles.appName}>DevBeats</Text>
          <View style={styles.linesContainer2}>
            <View style={styles.line2}></View>
            <View style={styles.line2}></View>
          </View>
          <Text style={styles.appDescription}>Code Your Rhythm</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.login}>LOG IN</Text>
          <TextInput
            onChangeText={(value) => {
              onChangeForm("email", value);
            }}
            value={form.email}
            placeholder="email"
            key="email"
            style={styles.input}
          />
          <TextInput
            onChangeText={(value) => {
              onChangeForm("password", value);
            }}
            value={form.password}
            secureTextEntry={true}
            placeholder="password"
            keyboardType="numeric"
            key="password"
            style={styles.input}
          />
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={styles.register}>Registre-se</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => onButtonClick()}
              title="Login"
              accessibilityLabel="Login"
              disabled={buttonDisabled}
              color="#4EAEA4"
            />
          </View>
        </View>
      </View>
    </Gradient>
  );
};
