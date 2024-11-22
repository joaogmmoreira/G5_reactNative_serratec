import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabRoutes } from "./BottomTabNavigator";
// import { StackNavigator } from "./StackNavigator";
import AuthProvider from "../context/Auth";

export const Routes = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <BottomTabRoutes />
        {/* <StackNavigator /> */}
      </AuthProvider>
    </NavigationContainer>
  );
};
