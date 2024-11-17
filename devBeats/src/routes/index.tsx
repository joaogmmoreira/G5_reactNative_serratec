import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabRoutes } from "./BottomTabNavigator";
import { AuthContext } from "../context/Auth";
import AuthProvider from "../context/Auth";
// import { Login } from "../screens/Login";

export const Routes = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <BottomTabRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
};
