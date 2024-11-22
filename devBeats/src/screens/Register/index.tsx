import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Gradient } from "../../components/Gradient/Gradient";
import { createUser } from "../../services/backendApi";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export const Register = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    doublePassword: "",
  });

  const navigate = useNavigation<any>();

  const onChangeForm = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };
  const formValidation = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(form.email);
    const nameValidation = form.name.length >= 3;
    const passwordValidation = form.password === form.doublePassword;
    const passwordLength = form.password.length >= 6;

    if (
      nameValidation &&
      isEmailValid &&
      passwordValidation &&
      passwordLength
    ) {
      return setButtonDisabled(false);
    }

    return setButtonDisabled(true);
  };

  const onButtonClick = () => {
    const { doublePassword, ...newForm } = form;
    createUser(newForm);
    navigate.navigate("login");
  };

  useEffect(() => {
    formValidation();
  }, [form]);

  return (
    <Gradient>
      <View style={styles.container}>
        <Text style={styles.text}>Registro</Text>
        <TextInput
          onChangeText={(value) => {
            onChangeForm("name", value);
          }}
          style={styles.input}
          placeholder="Nome Completo"
        />
        <TextInput
          onChangeText={(value) => {
            onChangeForm("email", value);
          }}
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          onChangeText={(value) => {
            onChangeForm("password", value);
          }}
          value={form.password}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Senha"
        />
        <TextInput
          onChangeText={(value) => {
            onChangeForm("doublePassword", value);
          }}
          value={form.doublePassword}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Repita a senha"
        />
        <TouchableOpacity
          onPress={() => onButtonClick()}
          disabled={buttonDisabled}
          style={[styles.button]}
        >
          <Text style={styles.text}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </Gradient>
  );
};
