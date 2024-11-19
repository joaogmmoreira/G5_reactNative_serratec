import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import { AuthContext } from "../../context/Auth";
import { styles } from "./styles";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formValidation();
  }, [form]);

  const authContext = useContext(AuthContext);
  const login = authContext ? authContext.login : () => {};
  // const authenticated = authContext ? authContext.authenticated : false;
  // const logout = authContext ? authContext.logout : () => {};

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
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => {
          onChangeForm("email", value);
        }}
        value={form.email}
        placeholder="email"
        key="email"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => {
          onChangeForm("password", value);
        }}
        value={form.password}
        secureTextEntry={true}
        placeholder="password"
        keyboardType="numeric"
        key="password"
      />
      <View style={styles.button}>
        <Button
          onPress={() => onButtonClick()}
          title="Login"
          accessibilityLabel="Login"
          disabled={buttonDisabled}
        />
      </View>
      {/* <Text>Login</Text> */}
    </View>
  );
};
